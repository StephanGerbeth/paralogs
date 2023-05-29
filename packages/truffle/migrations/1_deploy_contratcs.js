const Participation = artifacts.require('Participation');

module.exports = async function (deployer) {
  console.log('AJA');
  await deployer.deploy(Participation, '0x1FF7e338d5E582138C46044dc238543Ce555C963');
  const participation = await Participation.deployed();
};
