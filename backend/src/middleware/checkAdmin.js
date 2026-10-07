

function checkAdminRole(allowedRoles) {
    return (req, res, next) => {
        const { role } = req.user;
        if (!allowedRoles.includes(role)){
            return res.status(403).json({ estado: false, message: 'Acceso denegado'})
        }
        next();
    }
}

export default checkAdminRole;