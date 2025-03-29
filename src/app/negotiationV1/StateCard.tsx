type StateCardProps = {
  data:
    | {
        type: "init";
        data: { initial_observations: { 0: string; 1: string } };
      }
    | {
        type: "state";
        data: {
          player_id: number;
          observation: string;
        };
      }
    | {
        type: "action";
        data: {
          player_id: number;
          action: string;
        };
      }
    | {
        type: "step";
        data: { observations: { 0: string; 1: string } };
      }
    | {
        type: "critique";
        data: {
          feedbacks: { 0: { feedback: string }; 1: { feedback: string } };
        };
      };
};

function StateCard(message: StateCardProps) {
  console.log("Received message:", message);
  if (message.data.type === "init") {
    return (
      <div className="my-2 border border-white">
        <p>{message.data.type}</p>
        <p>{message.data.data.initial_observations[0]}</p>
        <p>{message.data.data.initial_observations[1]}</p>
      </div>
    );
  }
  if (message.data.type === "state") {
    return (
      <div className="my-2 border border-white">
        <p>{message.data.type}</p>
        <p>{message.data.data.observation}</p>
      </div>
    );
  }
  if (message.data.type === "action") {
    return (
      <div className="my-2 border border-white">
        <p>{message.data.type}</p>
        <p>{message.data.data.player_id}</p>
        <p>{message.data.data.action}</p>
      </div>
    );
  }
  if (message.data.type === "step") {
    return (
      <div className="my-2 border border-white">
        <p>{message.data.type}</p>
        <p>{message.data.data.observations[0]}</p>
        <p>{message.data.data.observations[1]}</p>
      </div>
    );
  }

  if (message.data.type === "critique") {
    return (
      <div className="my-2 border border-white">
        <p>{message.data.type}</p>
        <p>{message.data.data.feedbacks[0].feedback}</p>
        <p>{message.data.data.feedbacks[1].feedback}</p>
      </div>
    );
  }
}

export default StateCard;
