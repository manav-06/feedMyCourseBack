import React, { useEffect, useState } from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';
import firebase from "../firebaseHandler";
const db = firebase.firestore();

const allUserTypes = [
    "Student",
    "Faculty",
    "Parents",
    "Alumni",
    "Industry Personel"
];

const UserType = (props) => {
    const { } = props;
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(String(localStorage.getItem("userType") || "Student"));


    const handleUserTypeChange = () => {
        if (user) {
            db.collection("users").doc(user.uid).update({ userType: userType }).then(() => {
                console.log("Changed usertype to", userType);
                let newUser = user;
                newUser.userType = userType;
                setUser(newUser);
                window.location.reload();
            }).catch((err) => {
                console.log("Could not change user-type", err);
            });
        }
    };

    return (
        <div style={{
            width: "100%"
        }}>
            <p style={{ fontSize: 30, marginBottom: 30 }}>Help us know you better.</p>
            <p style={{ fontSize: 15 }}>Who are you?</p>
            <Select
                labelId="userType-select-label"
                id="userType-select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                variant="outlined"
                style={{ width: "30%", marginBottom: 30 }}
            >
                {allUserTypes.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
            </Select>
            <br></br>
            <Button style={{ width: "20%" }} variant="contained" color="primary" onClick={handleUserTypeChange}>
                Save
            </Button>
        </div>
    );


};



export default UserType;