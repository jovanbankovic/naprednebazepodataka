class Auth
{
    constructor()
    {
        this.authenticated = false;
    }
    
    login(cb)
    {
        this.authenticated = true;
        cb();
    }

    redirect(cb)
    {        
        if(localStorage.getItem('username') != null)
        {
            this.authenticated = true;
        }
        cb();
    }

    logout(cb)
    {
        this.authenticated = false;
        cb();
    }

    isAuthenticated()
    {
        return this.authenticated;
    }
}

export default new Auth();