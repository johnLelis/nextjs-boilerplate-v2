import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PasskeyLoadingCard = () => {
  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
        <CardDescription>
          Use passkeys for passwordless authentication with biometrics or
          security keys
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Loading passkeys...</p>
      </CardContent>
    </Card>
  );
};
export default PasskeyLoadingCard;
