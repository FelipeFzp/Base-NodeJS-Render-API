import "reflect-metadata";
import express from 'express';
import dotenv from "dotenv";
import { routes } from './routes';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';

export class Server {
    public express = express();

    constructor() {
        this._configureEnvironment();
        this._configureMiddlewares();
        this._configureRoutes();
        this._configureViews();

        this._start();
    }

    private _configureEnvironment(): void {
        dotenv.config();
    }

    private _configureViews(): void {
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());

        const viewsFolderPath = path.join(__dirname, 'views');
        this.express.set('view engine', 'ejs');
        this.express.set('views', viewsFolderPath);
        this.express.use(express.static(viewsFolderPath));
        this.express.use(express.static(viewsFolderPath, { lastModified: true, etag: false }));

        this.express.use(sassMiddleware({
            src: 'src/views',
            dest: 'dist/views',
            outputStyle: 'compressed',
            debug: true, //show compilation logs on console
            // prefix: '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
        }));
    }

    private _configureMiddlewares(): void {
        this.express.use(express.json());
    }

    private _configureRoutes(): void {
        this.express.use(routes);
    }

    private _start(): void {
        this.express.listen(process.env.PORT, () => {
            console.info(`Express running on http://localhost:${process.env.PORT}`);
        })
    }
}
new Server();