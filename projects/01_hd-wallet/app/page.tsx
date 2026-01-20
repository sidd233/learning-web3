"use client";

import { useState, useEffect } from "react";
import Mnemonic from "@/components/Mnemonic";
import { Button } from "@/components/ui/button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { createAccount } from "@/lib/createAccount";
import { AccountCard } from "@/components/AccountCard";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("accounts");
    if (stored) setAccounts(JSON.parse(stored));
  }, []);

  const handleResetWallet = () => {
    const newMnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(newMnemonic);

    setMnemonic(newMnemonic);
    localStorage.setItem("seed", seed.toString("hex"));

    localStorage.setItem("accounts", JSON.stringify([]));
    setAccounts([]);
  };

  const handleNewAccount = () => {
    const acc = createAccount();
    if (!acc) return;
    setAccounts((prev) => [...prev, acc]);
  };

  const handleClear = () => {
    setMnemonic("");
  };

  const handleDelete = (pubKey: string) => {
    const stored = localStorage.getItem("accounts");
    if (!stored) return;

    let accounts: any[] = [];

    try {
      accounts = JSON.parse(stored);
    } catch {
      return;
    }

    const newAccounts = accounts.filter((item) => item.publicKey !== pubKey);

    setAccounts(newAccounts);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">HD Wallet Demo</h1>
        <div className="flex gap-2">
          <Mnemonic
            mnemonic={mnemonic}
            handleResetWallet={handleResetWallet}
            handleClose={handleClear}
          />
          <Button onClick={handleNewAccount}>Create New Account</Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accounts.map((acc, i) => (
          <AccountCard
            key={i}
            acc={acc}
            index={i}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
