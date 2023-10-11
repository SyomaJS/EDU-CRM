"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function start() {
    const PORT = process.env.PORT || 3030;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(session({
        secret: process.env.ACCESS_TOKEN_KEY,
        resave: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest Js App')
        .setDescription('Application for Educational Centers')
        .setVersion('1.0')
        .addTag('NestJs PostgreSQL GoogleAuth PassportJS etc...')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => {
        console.log(`Listening on ${PORT} port ✅`);
    });
}
start();
//# sourceMappingURL=main.js.map