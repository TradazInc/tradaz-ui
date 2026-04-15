import { useState, useMemo } from "react";
import { generateDummyVouchers } from "@/app/lib/data";
import { GiftVoucher } from "@/app/lib/definitions";

export const useVouchers = () => {
    const [vouchers, setVouchers] = useState<GiftVoucher[]>(() => generateDummyVouchers());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Fully Redeemed" | "Expired" | "Revoked">("All");

    // --- ACTIONS ---
    const revokeVoucher = (id: string) => {
        setVouchers(prev => prev.map(v => 
            v.id === id ? { ...v, status: "Revoked" } : v
        ));
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const resendEmail = (email: string) => {
        alert(`Voucher email queued to be resent to ${email}!`);
    };

    const handleAddVoucher = (newVoucher: GiftVoucher) => {
        setVouchers(prev => [newVoucher, ...prev]);
    };

    // --- FILTERING ENGINE ---
    const filteredVouchers = useMemo(() => {
        return vouchers.filter(v => {
            const matchesSearch = v.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  v.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  v.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || v.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [vouchers, searchTerm, statusFilter]);

    // --- FINANCIAL STATS ---
    const totalOutstandingLiability = useMemo(() => {
        return vouchers.filter(v => v.status === "Active")
                       .reduce((acc, curr) => acc + curr.remainingBalance, 0);
    }, [vouchers]);
        
    const totalRedeemedValue = useMemo(() => {
        return vouchers.reduce((acc, curr) => acc + (curr.initialValue - curr.remainingBalance), 0);
    }, [vouchers]);

    return {
        searchTerm, setSearchTerm,
        statusFilter, setStatusFilter,
        filteredVouchers,
        revokeVoucher, copyToClipboard, resendEmail, handleAddVoucher,
        totalOutstandingLiability, totalRedeemedValue
    };
};