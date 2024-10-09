export const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]
export const generateInitials = (name) => {
    if(name){
    const words = name.split(' ');
    let initials = '';

    if (words.length > 2) {
        for (let i = 0; i < 2; i++) {
            initials += words[i][0].toUpperCase();
        }
    }else {
        for (let i = 0; i < words.length; i++) {
            initials += words[i][0].toUpperCase();
        }
    }

    return initials;
}
};