import { Text, createStyles } from "@mantine/core";
import Image from "next/image";

interface EmptyProps {
  text: string;
}

const useStyles = createStyles((theme) => ({
  empty: {
    display: "Flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "80px",
  },
}));

export const Empty = ({ text }: EmptyProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.empty}>
      <Image src="/empty.svg" width={241} height={231} alt="" />
      <Text mt="32px" fw={700} fz="24px">
        {text}
      </Text>
    </div>
  );
};
