import { Container } from "inversify";
import { HealthService } from "./services/health.service";

var ServiceCollection = new Container();
ServiceCollection.bind(HealthService).toSelf();

export default ServiceCollection;