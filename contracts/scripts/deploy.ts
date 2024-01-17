import { viem, run } from "hardhat";

async function main() {
  console.log(`Start deploy`);
  const forwarder = await viem.deployContract("Forwarder", [], {});
  console.log(`Forwarder deployed to ${forwarder.address}`);

  const trustedForwarderAddress = forwarder.address;
  const metaTxNft = await viem.deployContract(
    "MetaTxNft",
    [trustedForwarderAddress],
    {}
  );

  console.log(`MetaTxNft deployed to ${metaTxNft.address}`);

  console.log("Verify --------------------------------------");

  // デプロイ完了直後にverifyすると失敗するので15秒待つ
  console.log("Waiting for 15 seconds before verification...");
  await new Promise((resolve) => setTimeout(resolve, 15000));

  try {
    await run("verify:verify", {
      address: forwarder.address,
      constructorArguments: [],
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await run("verify:verify", {
      address: metaTxNft.address,
      constructorArguments: [trustedForwarderAddress],
    });
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
