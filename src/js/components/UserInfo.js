export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this._profileName = profileTitle;
    this._profileJob = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const job = this._profileJob.textContent;
    return {
      name,
      job,
    };
  }

  setUserInfo(name, job, avatar) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
    this._profileAvatar.src = avatar;
  }
}
