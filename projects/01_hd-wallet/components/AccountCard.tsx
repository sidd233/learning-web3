import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";

export const AccountCard = ({
  acc,
  index,
  handleDelete,
}: {
  acc: any;
  index: number;
  handleDelete: (pubkey: string) => void;
}) => {
  const [showPrivate, setShowPrivate] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <div className="font-semibold text-lg">Account #{index + 1}</div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Public Key */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Public Key</div>
          <div className="flex items-center gap-2">
            <div className="truncate w-full">{acc.publicKey}</div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => copy(acc.publicKey)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Private Key */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Private Key</div>

          <div className="flex items-center gap-2">
            <div className="truncate w-full">
              {showPrivate ? acc.privateKey : "••••••••••••••••••••"}
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowPrivate(!showPrivate)}
            >
              {showPrivate ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>

            {showPrivate && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copy(acc.privateKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => handleDelete(acc.publicKey)}
          variant="destructive"
          className="w-full"
        >
          Delete Account
        </Button>
      </CardFooter>
    </Card>
  );
};
