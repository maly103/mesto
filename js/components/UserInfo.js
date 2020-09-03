export default class UserInfo {
    constructor({
        profileTitle,
        profileSubtitle
    }) {
        this._profileName = profileTitle;
        this._profileJob = profileSubtitle;
    }

    getUserInfo() {
        const name = this._profileName.textContent;
        const job = this._profileJob.textContent
        return ({
            name,
            job
        });
    }

    setUserInfo(nameInput, jobInput) {
        this._profileName.textContent = nameInput.value;
        this._profileJob.textContent = jobInput.value;
    }


}