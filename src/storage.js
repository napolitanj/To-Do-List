export default function Storage() {
    
    //Save Projects
    function sP(projects) {
        localStorage.setItem('projects',JSON.stringify(projects))
    }

    //Load Projects
    function lP(projects){
        projects = JSON.parse(localStorage.getItem('projects'))
    }
}