import { Button, Spinner } from "@chakra-ui/react";

export default function SpinnerButton({ children, loading, ...props }) {
  return <Button {...props}>{loading ? <Spinner /> : children}</Button>;
}
