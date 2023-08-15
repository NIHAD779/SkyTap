import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entitites from "./entitites";
import Physics from './physics'
import { useEffect, useState } from "react";
export default function App() {
  const [running,setRunning] = useState(false)
  const [gameEngine,setGameEngine] = useState(null)
  const [currentPoints, SetCurrentPoints] = useState(0)
  useEffect(() => {
    setRunning(true);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        entities={entitites()}
        systems={[Physics]}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
            case "new_point":
              SetCurrentPoints(currentPoints + 1);
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={()=>{
              SetCurrentPoints(0);
              setRunning(true)
              gameEngine.swap(entitites())
            }}
          >
            <Text style={{fontWeight:'bold',color:'white',fontSize:30}}>START GAME</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
