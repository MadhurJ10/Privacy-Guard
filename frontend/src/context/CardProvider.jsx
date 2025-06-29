import React, { createContext, useState } from 'react'

export const CardContext = createContext();

const CardProvider = ({ children }) => {
    const CardItems = [
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzAg0FzvZmnEZkMdCxKcLLFB_j3PF0MjCXJlD-2Z4qGbiGYmljcxlZE046mJ4hYjldmKE-cCph0L_G5kZY9KrxPhi4cuJuptk5Hw6zpYxyr6gGvQWb7sZKhTsPJ7F58zRyHorvJqM8bjnkNBpXgV3N0xY4YJnhn8yhvxDh7treMax1ucr7ov_H66aFDk-2HOTFYLyFlDOj8vBgUgA0KjpCj_IhQ2kIXOs6DCGLpiwdIdzx-Cu-MGikVdD9A3y4G4UJQ-KXQhFtNE0",
            heading: "Password Vault",
            description: "Securely store and manage your passwords.",
        },
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMPBWwF21v_yYNa60W_dt9p33tyPB2Mtc_QCQuL0BskLgOxwcf6_3Ub0fbGJj9S-8YsPe_fxgdHnUrLTLgfgRVFjct3IRUoShZnqg0UFZvp9vnVeN1JHlka5w3okGQq-R6XxP9CKmrvp-dQgZcKHRFsQLPicgCODJ6CWhCqFzE3CwfkzrrXayov2ZzTsJC1TC_yWDkqW4T7VBFuxxtEoCGwAb48GZCrtXlqXeOlXjNZEUzsebQkxEWUnWjKxjaqbUfP2N0xBcMlaY",
            heading: "Breach Detection",
            description: "Get notified of data breaches affecting your accounts.",
        },
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW9BjhHnx24XddNfz6F3ekXvad3miiSa5qAxNhJXGvty_vRtyyvABglms6XDlRtC6Z2YbPs8FuAU-AB0pr35jGsgrUMj7J0TXoRI5dBvc82tiwqQLC6LX5ViV_o40fJHgDXMb2DxjB1TD-Vtm8qAH0cvMohDfIdYRCv0zt_w5Xi3kZuWaWpnX4SC799-jpNJMwDx6uRdWXjBMLv-4LxlHYh7-V2J3_c89XKpovbRQGR7tyWaIOFvfyLcVYZRxgiL4eygin-7MXQls",
            heading: "Fake Info Generator",
            description: "Create temporary, disposable information for online use.",
        },
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUpQK4fpkmtTI_ggAERj-ICJi3AKLcBLohFPdA_iH-s7wLEz8YHql44qc9LDxs0m-8X1abpNjvxtsb9SM8pQHEPC0FU0ppjmVlWrVI-So39igQb8QshihW6FvqCZCT9vvDgZ6cKEKnjGUJKn9EGojsXSFAIhCuk1nvFEq-BnfRraX9MK6fdHs2XGn3sELhhAy-A-k_JxWkQzkiogViIPKPg7CFRXGvPr7zq-HfQUm-TEtNwmBr1qqdm8UgYaLM9jeqN2ctH1xHXg0",
            heading: "Cybersecurity News",
            description: "Stay informed about the latest cybersecurity threats and tips.",
        },
    ];

    const reviewData = [
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrkjBRhpdoYL5zpDwb7kyjl7Endf7542-FBo4FAcZNdHst2xfDSucAHY2bgyf3z3jxMwNLfs_k_g3BVIud7_m2HzLV2LrKM6vr6dCUciiNyxFzirIT-HdvScF9_Imst4KSQQ5J2NxsZ3BM3Q7SfMG0Ex63NzLg46VKMT1p1T-QyHufIK2kUw_rZL1G2yJDFzieFbIrXdIUZggUtTjxEaUub-uWziJKeFenZxgu8c5IeCAsQrFYoyxSCB87-DxDvLq0L1DY3XKsMrM",
            name: "Ethan Bennett",
            review: "The fake info generator is incredibly useful for signing up for services without compromising my real information. A solid tool overall.",
        },
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMTc9n-wLXqKcrPSeq5AhhIe0ttqMMsFYvzyZZeInPf8cKNrwnTPP9nZLMC_XzRaykI6wxHUENUbZ0zad8PbWrFxAtRHgL9Sze_vJsnjCHlQau3lvyKnWlWMc9Gp-x1bNA2QaCd8QOqZyrNQ_lJSzpNdjXpqIquLKHU3jvkUFd9t9r4fZj8ikqP4Vup-FQSxDj8r7JaXHCBnDu3fTjsyMfn33hg9RIDW3JyeqvwwBQGNo9CTACPs97-Z09wUTnfJ7_RJOwtN49L4U",
            name: "Olivia Hayes",
            review: "Privacy Guard has been a game-changer for me. I feel so much safer online knowing my passwords are secure and I'm alerted to any potential breaches.",
        },
        {
            imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9SGrZQiAZ1DTlwkifpHOewxGcy2b7E8sgDmCzNTIPwkWoz4EyZtYzZA2JwzUh2fK1Kc-yqXn8xyv60BrXI_fsH5VUfY4agrN09crFbbCtnk4JbrFARkn_y_FXgSfVc6zUE42edlAz42rYkbv_B0E6QuiJEdlsoNfbliCnCr3EgjV6M3RzhMEvlFs2jMwhsLYvAckARhWQipxaRWLsFs3TLeyYJbPRJ6J_O1bIfJFMPjrgpe9CbhsDp3GcKxrApyO4XoC22Rw6I6Q",
            name: "Sophia Clark",
            review: "I love the cybersecurity news feature. It keeps me updated on the latest threats and how to protect myself. Highly recommend Privacy Guard!",
        }
    ];



    return (
        <CardContext.Provider value={{ CardItems , reviewData }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardProvider
