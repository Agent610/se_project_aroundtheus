class UserInfo {
  constructor({ nameSelector, aboutMeSelector, setUserAvatar }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
    this._setUserAvatar = document.querySelector(setUserAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutMeElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
    this._setUserAvatar.image = avatar;
  }
}

export default UserInfo;
