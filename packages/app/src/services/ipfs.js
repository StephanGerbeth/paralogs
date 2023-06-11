import * as IPFS from 'ipfs-core';

const ipfs = new Map();

export const getIPFS = (name = 'default') => {
  if (!ipfs.has(name)) {
    // export const ipfs = IPFS.create();
    ipfs.set(
      name,
      IPFS.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        repo: 'ipfs_repos_what', // + Math.random(),
        // start: true,
        preload: {
          enabled: false
        },
        EXPERIMENTAL: {
          pubsub: true
        },
        relay: {
          enabled: true, // enable circuit relay dialer and listener
          hop: {
            enabled: true // enable circuit relay HOP (make this node a relay)
          }
        },
        pubsub: true,
        config: {
          Addresses: {
            Swarm: [
              '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/wrtc-star.discovery.libp2p.io/wss/p2p-webrtc-star'
            ]
          },

          Bootstrap: [
            '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
            '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
            '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
            '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
            '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
            '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
            // '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
            // '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
          ],
          Discovery: {
            MDNS: {
              Enabled: true,
              Interval: 0
            },
            webRTCStar: {
              Enabled: false
            }
          }
        }
      })
    );
  }
  return ipfs.get(name);
};
