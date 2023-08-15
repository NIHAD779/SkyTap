import Matter from "matter-js"
import { getPipeSizePosPair } from "./utils/random"
import { Dimensions } from "react-native";


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width;

export default Physics = (entitites,{touches,time,dispatch}) =>{
    let engine = entitites.physics.engine

    touches.filter(t => t.type === 'press')
    .forEach(t => {
        Matter.Body.setVelocity(entitites.Bird.body,{
            x:0,
            y:-8
        })
    })
    Matter.Engine.update(engine,time.delta)

    for (let index =1;index <=2; index ++){

        if (entitites[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entitites[`ObstacleTop${index}`].point){
            entitites[`ObstacleTop${index}`].point  = true
            dispatch({type:'new_point'})
        }
          if (entitites[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            Matter.Body.setPosition(
              entitites[`ObstacleTop${index}`].body,
              pipeSizePos.pipeTop.pos
            );
            Matter.Body.setPosition(
              entitites[`ObstacleBottom${index}`].body,
              pipeSizePos.pipeBottom.pos
            );
          }
        Matter.Body.translate(entitites[`ObstacleTop${index}`].body, { x: -3, y: 0 });
        Matter.Body.translate(entitites[`ObstacleBottom${index}`].body, {
          x: -3,
          y: 0,
        });
    }

    Matter.Events.on(engine,'collisionStart',(e)=>{
        dispatch({ type: "game_over" });
    })
    return entitites

}

