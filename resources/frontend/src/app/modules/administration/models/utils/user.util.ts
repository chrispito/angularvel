import { User, UserRole } from '../../models';

export function getUser(userData) {

    const user = new User();
    const roles: Array<UserRole> = [];

    user.email = userData.email;
    user.id = userData.id;
    user.joined = userData.joined;
    user.name = userData.name;
    userData.roles.data.forEach(item => {
        const role = new UserRole();
        role.id = item.id;
        role.name = item.name;
        roles.push(role);
    });
    user.roles = roles;
    return user;
}
