class Roles {
    constructor (app = '', parent = null) {
        this.app = app
        this.parent = parent
    }
    isRole (role) {
        return this.parent.isRole(`${this.app}_${role}`)
    }
    isRoot () {
        return this.isRole('root')
    }
    isAdmin (mod= '') {
        mod += mod? '_': ''
        return this.isRole(`${mod}admin`)
    }
}

export default {
    roles: [],
    subs: {},
    joinRole (role = [] || '') {
        this.roles = this.roles.concat(role).values()
    },
    isRole (role) {
        role = (role || "").toUpperCase()
        if (role.substr(0, 5) !== "ROLE_") {
            role = "ROLE_" + role
        }
        return this.roles.includes(role)
    },
    isRoot () {
        return this.isRole('root')
    },
    isAdmin (mod = '') {
        mod += mod? '_': ''
        return this.isRole(`${mod}admin`)
    },
    sub (app = '') {
        if (!this.subs[app]) {
            this.subs[app] = new Roles(app, this)
        }
        return this.subs[app]
    }
}