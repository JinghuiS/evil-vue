import { Injectable } from 'injection-js';
import { useRoute, useRouter } from 'vue-router';

@Injectable()
export class RouterService {
  router = useRouter();
}

@Injectable()
export class RouteService {
  route = useRoute();
}
