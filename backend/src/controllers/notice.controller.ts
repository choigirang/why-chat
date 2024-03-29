import { Request, Response } from 'express';

import Notice from '../models/notice.model';

/** 공지사항 목록 */
export async function showNotice(req: Request, res: Response) {
  const allNotice = await Notice.find();

  try {
    return res.status(200).send(allNotice);
  } catch (err) {
    return res.status(404).send(err);
  }
}

/** 공지사항 개별 조회 */
export async function eachNotice(req: Request, res: Response) {
  const { id } = req.params;

  const notice = await Notice.findOne({ noticeNumber: id });

  try {
    return res.status(200).send(notice);
  } catch (err) {
    return res.status(404).send(err);
  }
}

/** 권한 계정에 따른 공지사항 추가 */
export async function addNotice(req: Request, res: Response) {
  const { title, content, date } = req.body;

  try {
    const noticeNumber = await Notice.countDocuments();

    const createdPost = new Notice({
      noticeNumber: noticeNumber + 1,
      title,
      content,
      date,
    });

    await createdPost.save();
    return res.status(200).json('성공');
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
}
