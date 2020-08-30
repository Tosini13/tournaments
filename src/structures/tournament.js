import firebase from 'firebase';

export async function getImage(url, child) {
    const storage = firebase.storage();
    const pathReference = storage.ref(url);

    await pathReference.child(child).getDownloadURL().then(function (url) {
        return url;
    }).catch(function (error) {
        console.log(error);
    });
}