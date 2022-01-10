import { Injectable } from 'injection-js'
import { Viewer, VueService } from 'packages'

@Injectable()
export class TestService extends VueService {
    @Viewer()
    test = 1
}
