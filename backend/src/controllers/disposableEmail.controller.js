const axios = require('axios');
const { faker } = require('@faker-js/faker');

module.exports.CreateDisposableEmail = async (req, res) => {
    try {
        // Fetch available domains
        const responseDomain = await axios.get('https://api.mail.tm/domains');
        const domains = responseDomain.data['hydra:member'];
        const domain = domains[0].domain; // Use the first domain

        // Generate random username and password
        const username = faker.internet.username();
        const password = faker.internet.password();


        // Create an account
        const responseAccountCreate = await axios.post('https://api.mail.tm/accounts', {
            address: `${username}@${domain}`,
            password: password,
        });

        const accountData = responseAccountCreate.data; // Extract account details
        console.log('Account Address:', accountData.address);

        const responseToken = await axios.post('https://api.mail.tm/token', {
            address: accountData.address,
            password: password,
        })

        const tokenData = responseToken.data.token
        // console.log(tokenData)


        // Respond to the client
        res.json({
            success: true,
            message: 'Disposable email created successfully',
            account: {
                address: accountData.address,
                id: accountData.id,
                quota: accountData.quota,
                used: accountData.used,
                token: tokenData
            },
        });
    } catch (error) {
        console.error('Error creating disposable email:', error.message);

        res.status(500).json({
            success: false,
            message: 'Failed to create disposable email',
            error: error.message,
        });
    }
};

module.exports.getInbox = async (req, res) => {
    const {inboxToken} = req.body
    try {
        console.log
        const responseInbox = await axios.get("https://api.mail.tm/messages", {
            headers: {
                // 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDk1MDA1NzIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJhZGRyZXNzIjoidmlyZ2llX2NvbGxpbnNAcHVua3Byb29mLmNvbSIsImlkIjoiNjg0NzQyOWNlOGMwYjUzNzhlMGU4YzU3IiwibWVyY3VyZSI6eyJzdWJzY3JpYmUiOlsiL2FjY291bnRzLzY4NDc0MjljZThjMGI1Mzc4ZTBlOGM1NyJdfX0.qr1aDr1ezjUzaKm8jOCsWFbKIF6zVWNW73NrLfprHftJ6-VH9_gUw7qTUfOcurYvK9GZLlUs2ERjb8zfwl-Q-A`
                'Authorization': `Bearer ${inboxToken}`
            } // get the token from fornt end and store hte token in session storage
        })
        const inboxData = responseInbox.data['hydra:member']
        // console.log(inboxData)
        res.json({
            msg: 'inbox check',
            inbox : inboxData
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
}
