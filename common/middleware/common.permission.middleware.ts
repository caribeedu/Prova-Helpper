class CommonPermissionMiddleware {

    static FREE_PERMISSION = 1;
    static ADMIN_PERMISSION = 2;

    private static instance: CommonPermissionMiddleware;
    FREE_PERMISSION = CommonPermissionMiddleware.FREE_PERMISSION;
    ADMIN_PERMISSION = CommonPermissionMiddleware.ADMIN_PERMISSION;

    static getInstance() {
        if (!CommonPermissionMiddleware.instance) {
            CommonPermissionMiddleware.instance = new CommonPermissionMiddleware();
        }
        return CommonPermissionMiddleware.instance;
    }

    async onlyAdminCanDoThisAction(req: any, res: any, next: any) {
        let userPermissionLevel = parseInt(req.jwt.permissionLevel);
        if (userPermissionLevel & CommonPermissionMiddleware.ADMIN_PERMISSION) {
            return next();
        }
        else {
            return res.status(403).send({});
        }
    };

}

export default CommonPermissionMiddleware.getInstance();