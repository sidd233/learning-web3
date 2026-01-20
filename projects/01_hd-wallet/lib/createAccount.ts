import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export const createAccount = () => {
  const seed = localStorage.getItem("seed");
  if (!seed) return null;

  let accounts: any[] = [];
  const stored = localStorage.getItem("accounts");
  if (stored) {
    try {
      accounts = JSON.parse(stored);
    } catch {}
  }

  const index = accounts.length;
  const path = `m/44'/501'/${index}'/0'`;

  const derived = derivePath(path, seed).key;
  const keypair = nacl.sign.keyPair.fromSeed(derived);

  const privateKey = Buffer.from(keypair.secretKey).toString("base64");
  const publicKey = Keypair.fromSecretKey(
    keypair.secretKey
  ).publicKey.toBase58();

  const newAccount = { publicKey, privateKey };

  const updated = [...accounts, newAccount];
  localStorage.setItem("accounts", JSON.stringify(updated));

  return newAccount; // key part
};

