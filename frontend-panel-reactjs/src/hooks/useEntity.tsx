import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sagaActions } from 'store/saga';

type Entity = "roles" | 'permissions' | 'categories'

export default function useEntity(entityName: Entity) {
    const dispatch = useDispatch()
    const entities = useSelector((state: any) => state.entities);
    const entity = entities[entityName]

    useEffect(() => {
        if (entity === null) {
            switch (entityName) {
                case "roles":
                    dispatch({ type: sagaActions.FETCH_ROLES_SAGA })
                    break;
                case "permissions":
                    dispatch({ type: sagaActions.FETCH_PERMISSIONS_SAGA })
                    break;
                case "categories":
                    dispatch({ type: sagaActions.FETCH_CATEGORIES_SAGA })
                    break;
            }
        }
    }, [])

    return entity ?? []
}