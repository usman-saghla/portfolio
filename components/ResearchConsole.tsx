"use client";

import React, { useState, useEffect, useRef } from "react";

// Terrain Classification Colors & Metadata
const CLASS_COLORS = {
  unclassified: "rgba(139, 148, 163, 0.15)",
  vegetation: "#3DB8AE", // Teal
  urban: "#E8A33D", // Amber
  water: "#5A9BB5", // Steel blue
  agriculture: "#3A6B8A", // Deep Blue
};

type TerrainType = keyof typeof CLASS_COLORS;

interface GridCell {
  id: number;
  class: TerrainType;
  confidence: number;
  label: string;
}

interface Packet {
  id: string;
  time: string;
  source: string;
  protocol: "TCP" | "UDP" | "ICMP";
  length: number;
  info: string;
  status: "normal" | "malicious" | "scanning";
  confidence: number;
}

export default function ResearchConsole() {
  const [activeTab, setActiveTab] = useState<"swin" | "ids">("swin");

  // --- TAB 1: SWIN TRANSFORMER STATE ---
  const [gridCells, setGridCells] = useState<GridCell[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<"idle" | "bands" | "attention" | "done">("idle");
  const [activeWindow, setActiveWindow] = useState<number[]>([]); // indexes of cells in current attention window
  const [tMetrics, setTMetrics] = useState({
    accuracy: 0,
    kappa: 0,
    classes: { vegetation: 0, urban: 0, water: 0, agriculture: 0 },
  });

  // --- TAB 2: IDS STATE ---
  const [packets, setPackets] = useState<Packet[]>([]);
  const [idsRunning, setIdsRunning] = useState(true);
  const [attackInjected, setAttackInjected] = useState(false);
  const [alertLog, setAlertLog] = useState<string[]>([]);
  const packetIdCounter = useRef(1);

  // Initialize Swin-T Grid
  const initSwinGrid = () => {
    const cells: GridCell[] = Array.from({ length: 36 }, (_, i) => {
      // Determine ground truth classes deterministically for a mock satellite tile
      let terrain: TerrainType = "vegetation";
      let label = "Forest";
      const row = Math.floor(i / 6);
      const col = i % 6;

      if (row < 2 && col < 3) {
        terrain = "water";
        label = "Water Body";
      } else if (row >= 4 && col >= 4) {
        terrain = "urban";
        label = "Urban Built-up";
      } else if ((row === 2 && col >= 3) || (row === 3 && col === 2)) {
        terrain = "agriculture";
        label = "Cropland";
      }

      return {
        id: i,
        class: terrain,
        confidence: Math.round(92 + (i * 1.3) % 7.5),
        label,
      };
    });

    // Reset grid to unclassified
    setGridCells(cells.map(c => ({ ...c, class: "unclassified", confidence: 0 })));
    setScanStep("idle");
    setActiveWindow([]);
  };

  useEffect(() => {
    initSwinGrid();
  }, []);

  // Run Swin-T Simulator
  const runSatelliteScan = async () => {
    if (scanning) return;
    setScanning(true);
    setScanStep("bands");
    setActiveWindow([]);

    // Step 1: Multi-spectral band loading
    await new Promise((r) => setTimeout(r, 1400));
    setScanStep("attention");

    // Ground truth for recovery
    const groundTruth: TerrainType[] = Array.from({ length: 36 }, (_, i) => {
      const row = Math.floor(i / 6);
      const col = i % 6;
      if (row < 2 && col < 3) return "water";
      if (row >= 4 && col >= 4) return "urban";
      if ((row === 2 && col >= 3) || (row === 3 && col === 2)) return "agriculture";
      return "vegetation";
    });

    // Step 2: Loop through Swin attention windows (e.g. 2x2 patches moving step-wise)
    // We simulate 9 window shifts: 2x2 grids moving across the 6x6 layout
    const swinWindows = [
      [0, 1, 6, 7],     // top-left
      [2, 3, 8, 9],     // top-middle
      [4, 5, 10, 11],   // top-right
      [12, 13, 18, 19], // middle-left
      [14, 15, 20, 21], // center
      [16, 17, 22, 23], // middle-right
      [24, 25, 30, 31], // bottom-left
      [26, 27, 32, 33], // bottom-middle
      [28, 29, 34, 35], // bottom-right
    ];

    for (let w = 0; w < swinWindows.length; w++) {
      setActiveWindow(swinWindows[w]);
      // Update cell classification on the fly
      setGridCells((prev) =>
        prev.map((cell) => {
          if (swinWindows[w].includes(cell.id)) {
            return {
              ...cell,
              class: groundTruth[cell.id],
              confidence: Math.round(91 + Math.random() * 8.5),
            };
          }
          return cell;
        })
      );
      await new Promise((r) => setTimeout(r, 450));
    }

    setActiveWindow([]);
    setScanStep("done");
    setScanning(false);
    
    // Set classification metrics
    setTMetrics({
      accuracy: 96.1,
      kappa: 0.944,
      classes: {
        vegetation: 47.2,
        urban: 19.4,
        water: 16.7,
        agriculture: 16.7,
      },
    });
  };

  // --- TAB 2: PACKET GENERATION PIPELINE ---
  const generateSourceIp = () => {
    if (attackInjected && Math.random() > 0.3) {
      return "192.168.10.88"; // Attacker IP
    }
    return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
  };

  const createPacket = (): Packet => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    
    let protocol: "TCP" | "UDP" | "ICMP" = "TCP";
    let length = Math.floor(Math.random() * 200) + 64;
    let info = "HTTP GET /index.html";
    let status: "normal" | "malicious" | "scanning" = "normal";
    let confidence = Math.round(98 + Math.random() * 1.8);

    const rand = Math.random();
    if (rand < 0.25) {
      protocol = "UDP";
      info = "DNS Query TXT record";
    } else if (rand < 0.35) {
      protocol = "ICMP";
      info = "Echo Request (Ping)";
    }

    if (attackInjected) {
      const attackRand = Math.random();
      if (attackRand > 0.4) {
        protocol = "TCP";
        status = "malicious";
        length = 40; // Small packets for flooding
        info = "SYN Flood [SYN_SENT] - Port 80";
        confidence = Math.round(99 + Math.random() * 0.9);
      } else if (attackRand > 0.15) {
        protocol = "TCP";
        status = "scanning";
        info = "SYN Port Scan [closed port probe]";
        confidence = Math.round(94 + Math.random() * 4);
      }
    }

    return {
      id: `#${packetIdCounter.current++}`,
      time: timestamp,
      source: generateSourceIp(),
      protocol,
      length,
      info,
      status,
      confidence,
    };
  };

  // Run continuous network stream
  useEffect(() => {
    if (!idsRunning) return;

    const interval = setInterval(() => {
      const nextPacket = createPacket();
      setPackets((prev) => {
        const updated = [nextPacket, ...prev];
        return updated.slice(0, 7); // keep last 7 packets
      });

      if (nextPacket.status === "malicious" || nextPacket.status === "scanning") {
        setAlertLog((prev) => {
          const alert = `[ALERT] ${nextPacket.time} - Anomaly detected on ${nextPacket.source} (${nextPacket.info}) [Conf: ${nextPacket.confidence}%]`;
          return [alert, ...prev].slice(0, 10);
        });
      }
    }, attackInjected ? 300 : 900); // Floods faster under attack

    return () => clearInterval(interval);
  }, [idsRunning, attackInjected]);

  const toggleAttack = () => {
    if (!attackInjected) {
      setAttackInjected(true);
      setAlertLog((prev) => [
        `[SYSTEM] ${new Date().toLocaleTimeString()} - Network anomaly injection started. Monitoring multi-head attention vectors.`,
        ...prev,
      ]);
    } else {
      setAttackInjected(false);
      setAlertLog((prev) => [
        `[SYSTEM] ${new Date().toLocaleTimeString()} - Anomaly mitigated. Restoring baseline packet traffic filters.`,
        ...prev,
      ]);
    }
  };

  return (
    <div className="w-full glass-card border border-border rounded-xl p-6 bg-surface mt-8 relative overflow-hidden">
      {/* Dynamic background element inside the card */}
      <div className="glow-ring" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-6 mb-6">
        <div>
          <span className="eyebrow text-xs tracking-widest text-accent flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Interactive Research Lab
          </span>
          <h3 className="font-display font-semibold text-xl text-text">
            Transformer-based Inference Simulator
          </h3>
        </div>
        
        {/* Tab Controls */}
        <div className="flex bg-bg/80 border border-border rounded-lg p-1">
          <button
            onClick={() => setActiveTab("swin")}
            className={`px-4 py-2 text-xs font-mono rounded transition-all ${
              activeTab === "swin"
                ? "bg-accent text-bg font-semibold"
                : "text-dim hover:text-text"
            }`}
          >
            Swin-T Classifier
          </button>
          <button
            onClick={() => setActiveTab("ids")}
            className={`px-4 py-2 text-xs font-mono rounded transition-all ${
              activeTab === "ids"
                ? "bg-accent text-bg font-semibold"
                : "text-dim hover:text-text"
            }`}
          >
            Transformer IDS
          </button>
        </div>
      </div>

      {/* Content tabs */}
      {activeTab === "swin" ? (
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Swin grid visualization */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-dim mb-4 leading-relaxed">
                Visualizing hierarchical attention maps on satellite frames. The classifier pools neighboring patch tokens recursively in shifted windows to map terrain change points over time.
              </p>
              
              {/* Satellite Grid */}
              <div className="relative aspect-square w-full max-w-[340px] mx-auto bg-bg/60 border border-border/80 rounded-xl p-4 flex items-center justify-center">
                <div className="grid grid-cols-6 grid-rows-6 gap-1 w-full h-full relative">
                  {gridCells.map((cell) => {
                    const isInActiveWindow = activeWindow.includes(cell.id);
                    return (
                      <div
                        key={cell.id}
                        style={{
                          backgroundColor:
                            cell.class === "unclassified"
                              ? CLASS_COLORS.unclassified
                              : CLASS_COLORS[cell.class],
                        }}
                        className={`rounded-sm relative transition-all duration-300 ${
                          isInActiveWindow
                            ? "ring-2 ring-accent scale-105 z-10 shadow-[0_0_8px_rgba(76,201,192,0.6)]"
                            : "hover:brightness-125"
                        }`}
                      >
                        {/* Interactive cell coordinate tooltip */}
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-bg/90 rounded border border-accent flex flex-col justify-center items-center text-[8px] font-mono text-accent pointer-events-none transition-opacity">
                          <span>Idx: {cell.id}</span>
                          {cell.confidence > 0 && <span>{cell.confidence}%</span>}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Scan Line Overlay */}
                  {scanStep === "bands" && (
                    <div className="absolute inset-x-0 h-0.5 bg-accent/80 shadow-[0_0_12px_#3db8ae] animate-scan" />
                  )}
                </div>
              </div>
            </div>

            {/* Run Trigger */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={runSatelliteScan}
                disabled={scanning}
                className="flex-1 px-5 py-3 rounded-lg bg-accent text-bg font-mono text-xs font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors"
              >
                {scanning ? "Processing Windows..." : "Run Swin-T Inference"}
              </button>
              <button
                onClick={initSwinGrid}
                disabled={scanning}
                className="px-4 py-3 rounded-lg border border-border text-dim hover:text-text hover:border-accent font-mono text-xs transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Swin Stats & Metrics panel */}
          <div className="md:col-span-5 border border-border/40 rounded-xl p-5 bg-bg/40 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs font-semibold text-accent2 uppercase tracking-wider border-b border-border/40 pb-2 mb-4">
                Telemetry Log
              </h4>

              {/* Status stream */}
              <div className="font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between border-b border-border/10 pb-1">
                  <span className="text-dim">Processor:</span>
                  <span className="text-text font-semibold">Swin-T Core v2</span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-1">
                  <span className="text-dim">Input Size:</span>
                  <span className="text-text font-semibold">256 x 256 px</span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-1">
                  <span className="text-dim">Stage:</span>
                  <span className="text-text">
                    {scanStep === "idle" && <span className="text-dim">Ready</span>}
                    {scanStep === "bands" && <span className="text-accent animate-pulse">Loading Bands [B1-B12]</span>}
                    {scanStep === "attention" && <span className="text-accent2 animate-pulse">Shifted Window MSA</span>}
                    {scanStep === "done" && <span className="text-[#22c55e]">Completed</span>}
                  </span>
                </div>
              </div>

              {/* Output Metrics */}
              {scanStep === "done" ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-dim">Overall OA Accuracy:</span>
                      <span className="text-accent font-semibold">{tMetrics.accuracy}%</span>
                    </div>
                    <div className="w-full bg-bg/85 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${tMetrics.accuracy}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-dim">Kappa Coefficient:</span>
                      <span className="text-accent2 font-semibold">{tMetrics.kappa}</span>
                    </div>
                    <div className="w-full bg-bg/85 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent2" style={{ width: `${tMetrics.kappa * 100}%` }} />
                    </div>
                  </div>

                  {/* Terrain Class Distribution */}
                  <div className="pt-2 border-t border-border/20">
                    <p className="text-[10px] font-mono text-dim mb-2">Class Distribution:</p>
                    <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CLASS_COLORS.vegetation }} />
                        <span className="text-dim">Forest:</span>
                        <span className="text-text font-semibold ml-auto">{tMetrics.classes.vegetation}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CLASS_COLORS.urban }} />
                        <span className="text-dim">Urban:</span>
                        <span className="text-text font-semibold ml-auto">{tMetrics.classes.urban}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CLASS_COLORS.water }} />
                        <span className="text-dim">Water:</span>
                        <span className="text-text font-semibold ml-auto">{tMetrics.classes.water}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CLASS_COLORS.agriculture }} />
                        <span className="text-dim">Agri:</span>
                        <span className="text-text font-semibold ml-auto">{tMetrics.classes.agriculture}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-border/40 rounded-lg p-8 text-center text-dim font-mono text-xs">
                  {scanStep === "attention" ? "Computing attention map layers..." : "Click run to analyze satellite imagery."}
                </div>
              )}
            </div>

            {scanStep === "done" && (
              <p className="text-[10px] font-mono text-[#22c55e] border-t border-border/10 pt-4 mt-4 leading-relaxed">
                ✓ Temporal features encoded. Shifted local window alignment resolves land-boundary shifts dynamically.
              </p>
            )}
          </div>
        </div>
      ) : (
        // --- TAB 2: NETWORK INTRUSION DETECTOR ---
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Packet log viewer */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-xs text-dim">
                  Analyzing real-time packet telemetry. Highlights multi-head attention weights on suspicious fields.
                </p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-bg text-[10px] font-mono text-dim border border-border">
                    Packets: {packetIdCounter.current - 1}
                  </span>
                </div>
              </div>

              {/* Packets Stream */}
              <div className="bg-bg/75 border border-border/80 rounded-xl overflow-hidden font-mono text-[11px]">
                <div className="grid grid-cols-12 gap-1 bg-border/40 px-4 py-2 text-dim border-b border-border/80">
                  <span className="col-span-2">ID / Time</span>
                  <span className="col-span-3">Source IP</span>
                  <span className="col-span-2">Proto</span>
                  <span className="col-span-3">Payload Details</span>
                  <span className="col-span-2 text-right">IDS</span>
                </div>

                <div className="divide-y divide-border/20 h-[220px] overflow-y-auto">
                  {packets.length === 0 ? (
                    <div className="p-8 text-center text-dim">Starting network traffic hook...</div>
                  ) : (
                    packets.map((pkt) => {
                      const isAlert = pkt.status === "malicious" || pkt.status === "scanning";
                      return (
                        <div
                          key={pkt.id}
                          className={`grid grid-cols-12 gap-1 px-4 py-2 items-center transition-all ${
                            isAlert
                              ? "bg-amber-500/10 text-accent2 border-l-2 border-accent2 shadow-[inset_4px_0_12px_rgba(232,163,61,0.05)]"
                              : "text-text hover:bg-surface2/50"
                          }`}
                        >
                          <span className="col-span-2 text-dim">{pkt.time}</span>
                          <span className={`col-span-3 font-medium truncate ${isAlert ? "text-accent2" : "text-text"}`}>
                            {pkt.source}
                          </span>
                          <span className="col-span-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                pkt.protocol === "TCP"
                                  ? "bg-accent/15 text-accent border border-accent/20"
                                  : pkt.protocol === "UDP"
                                  ? "bg-[rgba(90,155,181,0.15)] text-accent-steel border border-[rgba(90,155,181,0.25)]"
                                  : "bg-surface2 text-dim border border-border"
                              }`}
                            >
                              {pkt.protocol}
                            </span>
                          </span>
                          <span className="col-span-3 truncate text-dim">{pkt.info}</span>
                          <span className="col-span-2 text-right font-semibold">
                            {pkt.status === "normal" && (
                              <span className="text-[#22c55e]">PASS</span>
                            )}
                            {pkt.status === "malicious" && (
                              <span className="text-accent2 animate-pulse">ALERT</span>
                            )}
                            {pkt.status === "scanning" && (
                              <span className="text-accent-steel">SCAN</span>
                            )}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={toggleAttack}
                className={`flex-1 px-5 py-3 rounded-lg font-mono text-xs font-semibold transition-all ${
                  attackInjected
                    ? "bg-accent2 text-bg hover:bg-accent2/90"
                    : "bg-accent text-bg hover:bg-accent/90"
                }`}
              >
                {attackInjected ? "Stop Anomalous Injection" : "Inject Network Threat Vector"}
              </button>
              <button
                onClick={() => setIdsRunning(!idsRunning)}
                className="px-4 py-3 rounded-lg border border-border text-dim hover:text-text hover:border-accent font-mono text-xs transition-colors"
              >
                {idsRunning ? "Pause Stream" : "Resume Stream"}
              </button>
            </div>
          </div>

          {/* IDS Threat Intelligence */}
          <div className="md:col-span-4 border border-border/40 rounded-xl p-5 bg-bg/40 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs font-semibold text-accent uppercase tracking-wider border-b border-border/40 pb-2 mb-4">
                IDS Decision Matrix
              </h4>

              {/* Anomaly list */}
              <div className="bg-bg/85 rounded-lg border border-border/60 p-3 h-[200px] overflow-y-auto font-mono text-[9px] space-y-2 select-text">
                {alertLog.length === 0 ? (
                  <div className="text-dim text-center py-10">No security alerts registered. Baseline traffic nominal.</div>
                ) : (
                  alertLog.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.includes("[ALERT]")
                          ? "text-accent2 border-b border-accent2/10 pb-1"
                          : "text-dim border-b border-border/10 pb-1"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border/15 mt-4 text-[10px] font-mono text-dim leading-relaxed">
              <span>Attention weights mapped on [Flag, DestPort, EntropySrc, DeltaTime]. Anomalous packet bursts flag threshold limits dynamically.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
