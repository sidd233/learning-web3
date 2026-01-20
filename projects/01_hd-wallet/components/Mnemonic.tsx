import { Copy, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

interface IMnemonicProps {
  mnemonic: string;
  handleResetWallet: () => void;
  handleClose: () => void;
}

const Mnemonic = ({
  mnemonic,
  handleResetWallet,
  handleClose,
}: IMnemonicProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(mnemonic);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setCopied(false);
            handleResetWallet();
          }}
        >
          Reset Wallet
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle>Mnemonic</DialogTitle>
            <DialogClose
              className="hover:bg-accent transition-all delay-50 duration-75 rounded cursor-pointer"
              onClick={handleClose}
            >
              <X />
            </DialogClose>
          </div>
          <DialogDescription>
            Save this mnemonic. This won&apos;t be showed again. Losing this
            will make you lose access to all your accounts.
          </DialogDescription>
        </DialogHeader>
        {/* content */}
        <div className="grid grid-cols-3 place-items-center gap-y-3 font-mono">
          {mnemonic.split(" ").map((item, idx) => (
            <div
              key={idx}
              className="flex gap-2 border rounded-md py-2 px-3 text-sm font-medium"
            >
              <span className="text-gray-500">{idx + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCopy}>
            {" "}
            <Copy /> {copied ? "Copied!" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Mnemonic;
