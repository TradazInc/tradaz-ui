import ExpenseTable from "@/components/shared/ExpenseTable";
import FormButton from "@/components/shared/FormButton";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import { getExpenses } from "@/server/expense";
import { computePath } from "@/utilities/computePath";
import { Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const expenses = getExpenses(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Expenses</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for an expense"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <FormButton asChild>
          <NextLink href={`${computePath(businessId)}/expenses/new`}>
            <LuPlus />
            Create Expense
          </NextLink>
        </FormButton>
      </PageItemContainer>

      <ExpenseTable initialExpenses={expenses} businessId={businessId} />
    </PageContainer>
  );
}
