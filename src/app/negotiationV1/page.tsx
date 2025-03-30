/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../components/button";
import { Select } from "../components/select";
import StateCard from "./StateCard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const MODEL_FAMILIES = [
  { value: "gpt", label: "GPT Models" },
  { value: "llama", label: "LLaMA Models" },
  { value: "deepseek", label: "DeepSeek Models" },
];

const MODEL_OPTIONS = {
  gpt: [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  ],
  llama: [
    { value: "llama3.1-405b", label: "LLaMA 3.1 405B" },
    { value: "llama3.1-70b", label: "LLaMA 3.1 70B" },
    { value: "llama3.1-8b", label: "LLaMA 3.1 8B" },
  ],
  deepseek: [
    { value: "deepseek-r1", label: "DeepSeek R1" },
    { value: "deepseek-v3", label: "DeepSeek V3" },
  ],
};

export default function NegotiationV1() {
  const [modelFamily, setModelFamily] = useState("");
  const [player1Model, setPlayer1Model] = useState("");
  const [player2Model, setPlayer2Model] = useState("");
  const [criticModel, setCriticModel] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset model selections when family changes
  const handleModelFamilyChange = (value: string) => {
    setModelFamily(value);
    setPlayer1Model("");
    setPlayer2Model("");
    setCriticModel("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setError(null);

    try {
      const wsUrl = `wss://${BACKEND_URL}/ws/game?actor_model1=${player1Model}&actor_model2=${player2Model}&critic_model=${criticModel}&seed=1`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnecting(false);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);
        } catch (e) {
          console.error("Failed to parse message:", e);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Connection failed. Please try again.");
        setIsConnecting(false);
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed with code:", event.code);
        if (!event.wasClean) {
          setError("Connection closed unexpectedly. Please try again.");
        }
        setIsConnecting(false);
      };
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to establish connection. Please try again.");
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-96">
        <Image
          src="/negogi.jpg"
          alt="Negotiation background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center">
            Negotiation V1
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-12 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-lg mb-2">Select Model Family:</label>
            <Select
              options={MODEL_FAMILIES}
              value={modelFamily}
              onValueChange={handleModelFamilyChange}
              placeholder="Select Model Family"
            />
          </div>

          {modelFamily && (
            <>
              <div className="space-y-4">
                <label className="block text-lg mb-2">Player 1 Model:</label>
                <Select
                  options={
                    MODEL_OPTIONS[modelFamily as keyof typeof MODEL_OPTIONS]
                  }
                  value={player1Model}
                  onValueChange={setPlayer1Model}
                  placeholder="Select Model for Player 1"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-lg mb-2">Player 2 Model:</label>
                <Select
                  options={
                    MODEL_OPTIONS[modelFamily as keyof typeof MODEL_OPTIONS]
                  }
                  value={player2Model}
                  onValueChange={setPlayer2Model}
                  placeholder="Select Model for Player 2"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-lg mb-2">Critic Model:</label>
                <Select
                  options={
                    MODEL_OPTIONS[modelFamily as keyof typeof MODEL_OPTIONS]
                  }
                  value={criticModel}
                  onValueChange={setCriticModel}
                  placeholder="Select Model for Critic"
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={
              !modelFamily ||
              !player1Model ||
              !player2Model ||
              !criticModel ||
              isConnecting
            }
          >
            {isConnecting ? "Connecting..." : "Start Simulation"}
          </Button>
        </form>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              <StateCard data={message} />
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
}
