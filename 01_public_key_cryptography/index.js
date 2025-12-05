// ======================= NOBLE-ED25519 (LOW-LEVEL) ==========================
import * as ed from "noble-ed25519";

/**
 * Demonstrates pure Ed25519 signing/verification using noble-ed25519.
 * Shows how raw keys and Uint8Arrays work at the lowest level.
 */
export async function nobleExample() {
  // Generate a random Ed25519 private key (32 bytes)
  const privKey = ed.utils.randomPrivateKey();

  // Convert string → bytes (cryptographic functions operate on Uint8Array)
  const msg = new TextEncoder().encode("hello world");

  // Derive public key from private key
  const publicKey = await ed.getPublicKey(privKey);

  // Sign message with private key
  const signature = await ed.sign(msg, privKey);

  // Verify signature using public key + original message
  const isSigned = await ed.verify(signature, msg, publicKey);

  console.log("Noble Example Verified =", isSigned);
}

// ============================ SOLANA WEB3 + NACL ============================
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

/**
 * Shows how Solana’s Keypair works with TweetNaCl for signatures.
 * Solana keys are Ed25519 keys, so nacl.sign works directly.
 */
export function solanaWeb3Example() {
  // Create a new Solana Ed25519 keypair
  const keypair = Keypair.generate();

  const privKey = keypair.secretKey; // 64-byte expanded secret key
  const pubKey = keypair.publicKey; // Solana PublicKey object

  // Convert message → Uint8Array
  const msg = new TextEncoder().encode("hello world");

  // Create signature using TweetNaCl
  const signature = nacl.sign.detached(msg, privKey);

  // Verify signature
  const result = nacl.sign.detached.verify(msg, signature, pubKey.toBytes());

  console.log("Solana Web3 Example Verified =", result);
}

// ====================== CREATE WALLET FROM MNEMONIC =========================
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

/**
 * Demonstrates full Solana wallet derivation from BIP39 mnemonic.
 * Uses SLIP-0010 (ed25519-hd-key) for derivation, not BIP32.
 * Derives multiple wallet accounts using Solana path 44'/501'.
 */
export function createSolanaWallets(count = 4) {
  // Generate human-readable 12-word mnemonic
  const mnemonic = generateMnemonic();
  console.log("Mnemonic =", mnemonic);

  // Convert mnemonic to 64-byte seed
  const seed = mnemonicToSeedSync(mnemonic);

  // Derive multiple wallet addresses
  for (let i = 0; i < count; i++) {
    // Standard Solana derivation path
    const path = `m/44'/501'/${i}'/0'`;

    // Derive a 32-byte seed for this wallet index
    const derived = derivePath(path, seed.toString("hex")).key;

    // Convert derived seed → Ed25519 keypair
    const secret = nacl.sign.keyPair.fromSeed(derived).secretKey;

    // Create a Solana Keypair object to get the public key
    const pubkey = Keypair.fromSecretKey(secret).publicKey.toBase58();

    console.log(`Wallet ${i + 1} Public Key =`, pubkey);
  }
}

// ============================= RUN ALL EXAMPLES =============================
async function main() {
  await nobleExample();
  solanaWeb3Example();
  createSolanaWallets();
}

main();
