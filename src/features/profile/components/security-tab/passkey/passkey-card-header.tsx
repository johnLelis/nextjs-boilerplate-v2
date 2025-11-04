import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PasskeyCardHeader = () => {
  return (
    <CardHeader>
      <CardTitle>Passkeys</CardTitle>
      <CardDescription>
        Use passkeys for passwordless authentication with biometrics or security
        keys
      </CardDescription>
    </CardHeader>
  );
};
export default PasskeyCardHeader;
