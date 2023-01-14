
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Profile from '../models/profile'

const ProfilePage = () => {
    const [loading, setLoading] = React.useState(false)
    const [name, setName] = useState("")
    const [vote, setVote] = useState(0)


    const breadcrumbData = [
        new Map<string, any>([["label", "Home"], ["url", "/"], ["alt", "Home"]]),
        new Map<string, any>([["label", "Profile"], ["url", "/profile"], ["alt", "Profile"]]),
    ]

    const handleChange = (event: any) => {
        let value = event.target.value;
        setName(value)
    }

    const handleVote = (count: number) => {
        if (!valid()) {
            alert("Name field is require")
        }
        setVote(count)

        let profile = new Profile(name, vote)
        console.log("profile", profile)

        return false
    }

    const valid = () => {
        return name != ""
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <Layout home={false} breadcrumbs={breadcrumbData} >
            <h1>Profile</h1>

            {
                (name != "") ? (
                    <ul>
                        <li>Name: {name}</li>
                        <li>Vote action: {vote}</li>
                    </ul>

                ) : (<></>)
            }

            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </div>

                <div className="form-control">
                    <button onClick={() => { handleVote(1) }}>Vote Up +</button>
                    <button onClick={() => { handleVote(-1) }}>Vote Down -</button>
                </div>


            </form>
        </Layout>
    )

}

export default ProfilePage;