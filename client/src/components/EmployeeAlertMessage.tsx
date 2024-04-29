import React, { useState } from "react";

const AlertMessage: React.FC = () => {
  const [messageVisible, setMessageVisible] = useState<boolean>(true);

  const handleImageClick = (): void => {
    setMessageVisible(false);
  };

  return (
    <div className="container alert--container m-5">
      {messageVisible && (
        <div className="rappel-msg p-5">
          Dans le cas où la date limite d'une tâche est proche, un e-mail vous
          sera envoyé à titre de rappel
        </div>
      )}
      <img
        className="x-icon"
        src="Image33.png"
        alt="Image33"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default AlertMessage;
