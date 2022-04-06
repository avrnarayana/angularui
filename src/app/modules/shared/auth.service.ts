import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ServerApiInterfaceService } from './server-api-interface.service';
import { PayloadResponse } from '../../models/payload-models';

@Injectable()
export class AuthService {

    constructor(private serverApiInterfaceService: ServerApiInterfaceService) { }
   

}
