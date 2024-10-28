import React, { useState, useEffect } from 'react';
import Node from './Node';
import Link from './Link';

const NetworkTopology = () => {
  const [nodeStats, setNodeStats] = useState({
    node1: { traffic: 0, queueSize: 0 },
    node2: { traffic: 0, queueSize: 0 },
    node3: { traffic: 0, queueSize: 0 },
    node4: { traffic: 0, queueSize: 0 },
  });

  const [linkStats, setLinkStats] = useState({
    link1: { traffic: 0 },
    link2: { traffic: 0 },
  });

  const generateRandomTraffic = () => Math.floor(Math.random() * 100);
  const generateRandomPackets = () => Math.floor(Math.random() * 5);
  const processPackets = () => Math.floor(Math.random() * 3);

  useEffect(() => {
    const interval = setInterval(() => {
      const node1Traffic = generateRandomTraffic();
      const node2Traffic = generateRandomTraffic();
      const node3Traffic = generateRandomTraffic();
      const node4Traffic = generateRandomTraffic();

      const node1Queue = Math.max(0, nodeStats.node1.queueSize + generateRandomPackets() - processPackets());
      const node2Queue = Math.max(0, nodeStats.node2.queueSize + generateRandomPackets() - processPackets());
      const node3Queue = Math.max(0, nodeStats.node3.queueSize + generateRandomPackets() - processPackets());
      const node4Queue = Math.max(0, nodeStats.node4.queueSize + generateRandomPackets() - processPackets());

      setNodeStats({
        node1: { traffic: node1Traffic, queueSize: node1Queue },
        node2: { traffic: node2Traffic, queueSize: node2Queue },
        node3: { traffic: node3Traffic, queueSize: node3Queue },
        node4: { traffic: node4Traffic, queueSize: node4Queue },
      });

      const link1Traffic = Math.floor((node1Traffic + node2Traffic) / 2);
      const link2Traffic = Math.floor((node3Traffic + node4Traffic) / 2);

      setLinkStats({
        link1: { traffic: link1Traffic },
        link2: { traffic: link2Traffic },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nodeStats]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex justify-between items-center w-2/3 h-96 border border-gray-300 rounded-lg">
        <div className="absolute top-0 left-0">
          <Node name="Node 1" traffic={nodeStats.node1.traffic} queueSize={nodeStats.node1.queueSize} />
        </div>
        <div className="absolute top-0 right-0">
          <Node name="Node 2" traffic={nodeStats.node2.traffic} queueSize={nodeStats.node2.queueSize} />
        </div>
        <div className="absolute bottom-0 left-0">
          <Node name="Node 3" traffic={nodeStats.node3.traffic} queueSize={nodeStats.node3.queueSize} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Node name="Node 4" traffic={nodeStats.node4.traffic} queueSize={nodeStats.node4.queueSize} />
        </div>

        <div className="absolute top-20 left-12">
          <Link traffic={linkStats.link1.traffic} orientation="horizontal" />
        </div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Link traffic={linkStats.link2.traffic} orientation="vertical" />
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;