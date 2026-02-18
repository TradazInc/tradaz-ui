"use client";
import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { MotionBox } from "./motion";
import { WORDS, TYPING_SPEED, DELETING_SPEED, PAUSE_DURATION } from "./config";

export const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!reverse && subIndex === WORDS[index].length) {
      setTimeout(() => setReverse(true), PAUSE_DURATION);
      return;
    }

    if (reverse && subIndex === 0) {
     
      setTimeout(() => {
        setReverse(false);
        setIndex((i) => (i + 1) % WORDS.length);
      }, 0);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((i) => i + (reverse ? -1 : 1)),
      reverse ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <Text as="span" color="#5cac7d" display="inline-flex" alignItems="center">
      {WORDS[index].substring(0, subIndex)}
      <MotionBox
        animate={{ opacity: blink ? 1 : 0 }}
        ml={1}
        w="3px"
        h="1em"
        bg="#5cac7d"
        display="inline-block"
      />
    </Text>
  );
};