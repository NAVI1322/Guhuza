import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Heart, HandMetal, CircleMinus, Save, Ellipsis } from 'lucide-react';

interface ContentCardProps {
  avatarSrc: string;
  avatarFallback: string;
  name: string;
  publication: string;
  articleHeading: string;
  articleDescription: string;
  articleImageSrc: string;
  date: string;
  likes: string;
  comments: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  avatarSrc,
  avatarFallback,
  name,
  publication,
  articleHeading,
  articleDescription,
  articleImageSrc,
  date,
  likes,
  comments,
}) => {
  return (
    <div className="flex flex-col py-3 px-5">
      <div className="border-b pb-5 max-w-[680px] nhd:ml-0">
        <div className="flex text-xs items-center gap-2 mb-4">
          <Avatar className="size-5">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-[100px] truncate">{name}</div>
          <div className="font-light">in</div>
          <div className="min-w-[100px] truncate">{publication}</div>
        </div>
        <div>
          <div className="flex gap-10">
            <div>
              <div className="line-clamp-4 font-bold mb-2 md:text-lg">
                {articleHeading}
              </div>
              <div className="line-clamp-2 font-light text-sm mb-5">
                {articleDescription}
              </div>
            </div>
            <img
              src={articleImageSrc}
              className="w-20 h-14 shrink-0 md:w-40 md:h-[107px]"
              alt="article image"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5 text-xs">
              <Star className="block size-4" />
              <div className="date">{date}</div>
              <div className="gap-2 items-center hidden tsn:flex">
                <Heart className="size-4" />
                <div className="likes">{likes}</div>
              </div>
              <div className="gap-2 items-center hidden tsn:flex">
                <HandMetal className="size-4" />
                <div className="comments">{comments}</div>
              </div>
            </div>
            <div className="flex items-center gap-5 text-xs">
              <CircleMinus className="size-5 md:size-6" />
              <Save className="hidden md:block nhd:hidden nst:block" />
              <Ellipsis className="size-5 md:size-6" />
              <div className="w-40 h-full hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
