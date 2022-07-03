const hashUname = (name) => {
    var c = name.charCodeAt() % 5;
    switch (c) {
        case 0: return 'green';
        case 1: return 'blue';
        case 2: return 'coral';
        case 3: return 'grey';
        case 4: return 'yellow';
        default: return 'blue';
    }
}

const dateify = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dt = new Date(date);
    const today = new Date();
    const diff = Date.now() - dt;
    if (diff < 60000) return "a few seconds ago";
    else if (diff < 120000) return "a minute ago";
    else if (diff < 3600000) return "a few minutes ago";
    else if (diff < 7200000) return "an hour ago";
    else if (diff < 25200000) return `${Math.floor(diff / (3600000))} hours ago`;
    else if (diff < 86400000) return (dt.getDate()===today.getDate()) ? "Today":"Yesterday";
    else if (today.getFullYear === dt.getFullYear) return dt.getDate() + ' ' + monthNames[dt.getMonth()];
    else return dt.getDate() + ' ' + monthNames[dt.getMonth()] + ' ' + dt.getFullYear();
}

const postUtilities = {dateify, hashUname};
export default postUtilities;