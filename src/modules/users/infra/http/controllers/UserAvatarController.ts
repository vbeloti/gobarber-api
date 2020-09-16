import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import deletePassword from '@shared/utils/deletePassword';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      // user_id: res.locals.user,
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(deletePassword(user));
  }
}
