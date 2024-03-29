import { useState } from "react";
import { useParams } from "react-router-dom";
import { POST_USER_TO_GROUP } from "../../utils/apiCalls.mjs";
import "./AddFriendModal.scss";

const AddFriendModal = ({ show, modalCloseHandler, getMembers }) => {
  const [formFields, setFormFields] = useState({
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const authToken = sessionStorage.getItem("authToken");

  const { groupId } = useParams();

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formFields.username) {
      setErrorMessage("You must provide a username");
      return;
    }

    try {
      await POST_USER_TO_GROUP(groupId, formFields, authToken);

      getMembers();
      modalCloseHandler();
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <article className="add-friend-modal" onClick={modalCloseHandler}>
      <div
        className="add-friend-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="add-friend-modal__heading">Add a New Friend!</h3>

        <form onSubmit={handleSubmit} className="add-friend-modal__form">
          <label htmlFor="username" className="add-friend-modal__label">
            Username:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            className="add-friend-modal__input"
            placeholder="Enter username..."
          />

          {errorMessage && (
            <p className="add-friend-modal__error">{errorMessage}</p>
          )}
          <button className="add-friend-modal__submit" type="submit">
            Add Friend!
          </button>

          <button
            onClick={modalCloseHandler}
            className="add-friend-modal__cancel"
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </article>
  );
};

export default AddFriendModal;
