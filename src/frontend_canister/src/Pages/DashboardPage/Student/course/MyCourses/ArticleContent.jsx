import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { useTranslation } from 'react-i18next';
const ArticleContent = ({ courseId, ArticleId }) => {
    const { t } = useTranslation('MyCourses');
    console.log("Article ID Got", ArticleId);
    const { contentActor } = useAuth()
    const [ArticleTitle, setArticleTitle] = useState();
    const [ArticleDescription, setArticleDescription] = useState();
    // const [ArticleContent, setArticleContent] = useState();
    const [ArticleImage, SetarticleImage] = useState();

    const handleClick = async (ArticleId) => {

        try {

            const articleDetail = await contentActor.getarticle(ArticleId);

            setArticleTitle(articleDetail.articleTitle);
            setArticleDescription(articleDetail.description);
            SetarticleImage(articleDetail.articleImg);
            // setArticleContent(articleDetail.articleContent);


            // setLoading(false);
        } catch (e) {
            console.log(e)
            // setLoading(false);
        } finally {
            // setLoading(false);
        }

    }

    useEffect(() => {


        handleClick(ArticleId)


    }, [ArticleId]);
    return (
        <div>



            <h2 className="text-3xl font-bold">{ArticleTitle}</h2>
            <img src={ArticleImage} alt="" className='w-full h-full' />

            <div className=" md:flex md:space-x-6">
                <div className=" md:w-12/12">

                    <div>



                        <div className="items-center px-4 py-3 ">
                            <h3 className='block text-xl font-bold'>{t('Description')}</h3>
                            <p className='py-3 text-gray-700'>{ArticleDescription}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex justify-start w-48'>
                <button className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-full'
                    onClick={() => {
                        const CallComplete = async () => {
                            const result = await contentActor.videotracking(courseId, ArticleId);
                        }

                        CallComplete()
                    }}>
                   {t('MarkasCompleted')}
                </button>
            </div>

        </div>
    )
}

export default ArticleContent
