"use client";
// import { createData, deleteData } from "@/services/services";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import Image from "next/image";

const BlogDetail = ({ data }) => {
    console.log(data);

    // const writeBlog = async () => {
    //     // for (let i = 0; i < 100; i++) {
    //     //     try {
    //     //         await createData("blogs", {
    //     //             title: `Blog mới ${i}`,
    //     //             content: `Nội dung blog mới ${i}`,
    //     //             authorUid: "1zDzNJcsxDNUTctwizKV2jlU2rN2",
    //     //         });
    //     //     } catch (error) {
    //     //         console.error("L��i khi tạo blog mới:", error.message);
    //     //         break; // Nếu có l��i, dừng việc tạo blog tiếp theo
    //     //     } finally {
    //     //         console.log(`Tạo blog mới thành công ${i + 1}`);
    //     //     }
    //     // }
    //     const cont = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eum sit eveniet, porro error itaque natus, dolorem in laboriosam incidunt facilis facere nulla
    //         numquam ut eligendi sequi fugiat! Beatae repellendus enim, reprehenderit nam reiciendis doloremque eos porro voluptas quis ipsam quidem blanditiis
    //         consequuntur. Dolorum nam quos eius. Ducimus doloremque delectus rem, natus molestias doloribus ipsam nemo accusantium adipisci aperiam neque mollitia
    //         voluptate maxime, vitae dicta suscipit ex quas placeat eveniet? Veritatis itaque tempore, aspernatur repellat laudantium explicabo alias quam aliquam et
    //         corrupti ullam maiores corporis exercitationem nam quibusdam excepturi laborum debitis placeat eaque nisi voluptates tenetur. Assumenda deserunt corrupti unde
    //         reiciendis, debitis reprehenderit, vitae repudiandae quibusdam recusandae amet hic deleniti voluptatibus ullam, quo harum! Ex rerum reiciendis in modi fugit
    //         esse impedit dicta adipisci unde nostrum eveniet, voluptatem, illo earum accusamus, incidunt officia! Quod placeat nostrum, quas delectus ex dicta eos
    //         aspernatur perferendis minus quos voluptatum ab adipisci inventore cupiditate suscipit deserunt? Dolorum nesciunt eaque culpa modi velit quod cum dolores
    //         quaerat vitae explicabo perspiciatis architecto voluptas maxime, facere veniam est aut repellat? Ratione, sequi quisquam necessitatibus dolores modi
    //         consequuntur vel consectetur ab obcaecati! Eaque facere quos ratione, laborum possimus maxime quam odit ipsum maiores rem, nisi nihil aperiam nesciunt illo
    //         tempora id delectus adipisci aliquid, sequi ducimus. Deleniti doloremque, aliquid corporis possimus assumenda atque, iure, perferendis ipsa accusamus
    //         doloribus porro voluptatibus dicta voluptates tempore? Dolor iure laboriosam tempora soluta reprehenderit? Eveniet voluptatum sapiente inventore fugiat
    //         dolorum dolores, suscipit ratione quos repellendus quis magnam ducimus soluta ipsum molestiae nisi sequi nihil deleniti porro numquam eligendi odit tempora.
    //         Veniam eveniet, esse culpa ratione dicta dolor facere aliquam sapiente quibusdam tenetur, minima, expedita necessitatibus? Deleniti quos culpa illum dolorem a
    //         est, temporibus nam odio aliquam, saepe in quo ab velit eum reprehenderit deserunt explicabo sed! Natus omnis laborum dicta tempora vero! Exercitationem,
    //         sequi dolores et mollitia sint accusamus voluptates ratione. Itaque facere maiores minima dignissimos, explicabo fuga veritatis, deserunt dolorum vero quasi
    //         aliquam debitis adipisci earum, similique tempora accusamus dolor nesciunt. Unde laborum pariatur placeat qui ipsa exercitationem corporis nobis nisi facere
    //         reprehenderit. Veniam harum, consequuntur nesciunt sit quam aliquid magnam itaque fuga ratione quidem? Quasi ut a aliquid dolorem minus consectetur eligendi
    //         dolore eos repudiandae quidem inventore harum accusantium repellendus, corrupti doloremque repellat, incidunt iste magnam, asperiores odit sit necessitatibus!
    //         Molestiae culpa non, placeat at repellendus adipisci inventore totam maxime aut praesentium voluptatum nisi suscipit soluta veniam numquam officia dolorum
    //         neque voluptas maiores facere? Unde ducimus molestias architecto nam voluptatum rerum, amet deleniti exercitationem dicta minus ullam. Asperiores error
    //         tenetur eligendi natus veniam vitae suscipit repudiandae, eius, dolorem praesentium alias odit voluptates ratione ad nobis distinctio. Veritatis, quaerat vel
    //         laboriosam nam vero nulla autem commodi cupiditate temporibus non reiciendis repellendus, dolorem, harum sint expedita. Harum provident modi dolore placeat in
    //         a laborum quam quo unde maxime. Sint expedita quam numquam repudiandae nemo tempora vero hic aspernatur, suscipit minima libero minus, inventore amet quia
    //         distinctio repellat consequatur accusamus pariatur? Reprehenderit eius facere voluptates, placeat accusamus excepturi veniam optio ea, magnam odit ipsum, quod
    //         laboriosam modi enim porro dignissimos. Ipsum ad, explicabo corporis fuga voluptas commodi delectus facere quae dignissimos ipsam dolorum in exercitationem
    //         dolores natus quidem blanditiis neque repellendus veniam excepturi corrupti. Id, error nemo nesciunt labore iste aspernatur blanditiis eaque, ut optio, enim
    //         ipsam esse. Eos quidem vel facere esse facilis quod mollitia itaque tempora officiis maxime possimus error earum non sit cumque minima, nostrum similique
    //         eligendi ducimus et. Fuga est quam repellendus ex quia ipsa tempore incidunt facere quae dolore laboriosam quas dolores ea voluptatem, reiciendis, voluptates
    //         odit sint magnam cupiditate, quo odio perferendis vel nobis perspiciatis? Expedita dignissimos incidunt eius optio eos molestiae provident obcaecati quas
    //         labore ratione. Alias aliquam voluptate natus recusandae, eveniet eaque illum doloremque quam rem enim nisi pariatur culpa dolorem deleniti excepturi vel
    //         laborum? Deserunt, fuga omnis aperiam adipisci perspiciatis et aspernatur ipsa alias mollitia voluptate illo libero quis quae nobis vel eum? Distinctio
    //         consectetur necessitatibus laboriosam. Ullam porro, dicta natus distinctio tempore officiis. Reiciendis error deserunt earum veniam modi alias fuga quaerat
    //         mollitia vitae. Molestiae nostrum optio voluptatibus? Molestias debitis, laudantium commodi impedit ratione eos in earum nesciunt architecto recusandae velit
    //         nisi ea, provident accusamus. Ad voluptatibus nobis eaque nisi, ea autem qui velit quaerat optio odio nihil consequatur recusandae fugit hic fuga obcaecati
    //         sunt asperiores omnis voluptatum architecto, amet aperiam maxime? Sunt commodi, ipsa eos rem assumenda ut totam accusantium corrupti. Corrupti, ad eos?
    //         Architecto quo, rerum facere incidunt magni doloremque consectetur perspiciatis odio omnis temporibus commodi corrupti, nesciunt hic qui quae laudantium
    //         minima. Quaerat obcaecati distinctio harum delectus placeat totam aliquam, inventore error itaque dolore incidunt animi pariatur blanditiis velit repellat
    //         necessitatibus, quo et quos officia facere sed porro. Magni eligendi aspernatur fugiat labore perferendis similique libero maiores explicabo, rerum unde
    //         accusantium recusandae repellat. Esse voluptatum, beatae repellendus consequatur, in dolorum deserunt iusto suscipit eum possimus quod fugit saepe quos
    //         maiores, quis exercitationem ullam dolore. Libero cum earum reiciendis sed quaerat qui officiis asperiores numquam dignissimos. Consequuntur optio minima
    //         deleniti facilis similique veniam, consequatur quidem necessitatibus id suscipit sapiente eos adipisci mollitia in accusamus sed. Aut fuga dolor debitis id
    //         eaque ex aliquam pariatur reiciendis minus dolorem dolorum non facilis maiores consequuntur, iure, distinctio atque saepe. Alias voluptate sed nesciunt modi
    //         ea inventore? Corrupti illo dolorem explicabo illum! Laboriosam eum nobis delectus provident voluptatibus quia accusamus, tempora voluptates at eius, autem
    //         dolor rerum voluptatem minus quisquam similique quaerat, possimus corporis distinctio? Nobis sequi mollitia suscipit tenetur! Fugit possimus magni temporibus
    //         molestiae, rerum corporis asperiores harum, repellendus illum iure, esse quod adipisci tempore? Quam, repudiandae perspiciatis earum beatae accusantium
    //         architecto non sed delectus minima vero maiores aspernatur omnis iusto laudantium maxime similique illo! Corporis obcaecati ut consequuntur numquam excepturi
    //         eaque aperiam earum totam illum perferendis repellat esse eum assumenda pariatur aspernatur qui cum, a sint! Quasi assumenda laudantium ipsa eos consequuntur
    //         aut modi nulla sequi ipsam officia sapiente nostrum tempora perferendis rerum, architecto necessitatibus ad illum commodi consectetur, sint libero distinctio
    //         quidem! Id sequi illo, repellendus minima sunt nemo repudiandae assumenda, expedita odit vitae numquam magnam facere distinctio quas natus nihil consequatur
    //         quis esse! Itaque maiores, laborum placeat corrupti perspiciatis ad odit autem eveniet, molestias quidem neque velit inventore asperiores fugiat ducimus. Rem
    //         optio quaerat labore atque rerum et, alias maiores est nulla vero dolorem numquam adipisci nisi deserunt harum. At ipsum nihil error perspiciatis eum? Tenetur
    //         non, fuga repudiandae necessitatibus minus perferendis voluptate commodi reprehenderit eligendi id dignissimos. Dolorem natus non necessitatibus cumque
    //         similique sit voluptatem corrupti modi reiciendis aspernatur atque libero nobis esse sed dolor veniam neque adipisci excepturi quibusdam eum commodi
    //         perferendis, cum earum! Inventore delectus amet aut deleniti rerum minus! Assumenda molestias illo eos explicabo qui voluptate cumque! Modi, impedit obcaecati
    //         nesciunt voluptate eius sint magni dolores expedita aliquam labore maiores delectus laboriosam et sequi reprehenderit corporis accusantium voluptatem
    //         distinctio, asperiores fuga! Temporibus excepturi magni sint earum odit sapiente, eos iure doloribus, inventore assumenda consequatur provident sed totam
    //         porro cumque quisquam similique iste enim asperiores, tempore est obcaecati harum atque. Repellendus dolorem facere eveniet itaque deserunt sit quaerat
    //         blanditiis minus molestias suscipit accusamus velit iusto veritatis, quam dolor quae et optio neque labore dignissimos eos tenetur ab libero voluptate!
    //         Tempore eligendi quod nam voluptatum fugiat eum quos corrupti nostrum maxime nihil dignissimos fugit magni quo accusamus, libero debitis, exercitationem vel
    //         labore provident est ullam voluptate tenetur suscipit quas. Quia repellendus, veniam facere animi, debitis expedita eveniet placeat, rem excepturi ipsam saepe
    //         recusandae sint cumque nesciunt cupiditate. Aspernatur sequi doloremque dolore, ad voluptas, est assumenda ea consequatur porro distinctio tenetur maxime,
    //         similique repellat placeat laborum vero velit commodi unde ipsam quidem! Sapiente earum ipsum reiciendis sequi nesciunt minus obcaecati magnam voluptate velit
    //         ad, veniam officia, incidunt corporis ab eveniet at accusantium vero quos alias perferendis, cum dolores aut provident doloribus. Velit, itaque. Sed, ullam
    //         reiciendis delectus cupiditate commodi nam repellendus temporibus molestias dolore blanditiis alias illo et quam magnam tempora eligendi. Dignissimos omnis
    //         fuga id officia velit cum adipisci, porro provident voluptatum consectetur exercitationem eaque recusandae? Porro quibusdam veritatis dolor. Vero at eveniet
    //         nesciunt aliquid velit sequi voluptas omnis. Fugit fuga delectus reiciendis tempora eaque, dicta possimus sunt voluptatibus sed natus consequuntur cum eum
    //         dignissimos veritatis aut, rerum quis vel dolorum earum molestiae deserunt quisquam quibusdam quasi? Odit nihil reprehenderit delectus exercitationem beatae,
    //         eligendi error reiciendis dolorum quos necessitatibus doloribus deserunt iure consequuntur nulla cupiditate. Doloribus unde autem dicta animi eum cupiditate
    //         omnis at nihil necessitatibus nulla! Laudantium id quis dolor laboriosam hic. Suscipit fugiat, placeat deleniti odio sint quis quo delectus nulla ut debitis
    //         magni similique adipisci cupiditate illum id inventore cum harum expedita beatae recusandae voluptatum! Quis ea alias eaque, facilis quibusdam ratione
    //         exercitationem nulla doloribus velit hic, inventore fugiat iste culpa? Quia ullam veniam aliquam saepe inventore voluptatum explicabo dolore amet totam
    //         necessitatibus modi soluta, aliquid, incidunt deleniti doloribus voluptatibus qui neque blanditiis ea eaque quos! Veniam odio officiis recusandae maiores at
    //         commodi pariatur minima maxime voluptatum adipisci officia, dolore assumenda cumque! Inventore eaque deleniti mollitia, nisi officia necessitatibus incidunt
    //         asperiores in eum tempora quisquam laboriosam nam ullam modi molestias! Vero, eligendi! Eum corporis dolorum excepturi vel! Odit eum velit ipsam ab est
    //         obcaecati reiciendis enim dolor molestias perspiciatis vero, sequi porro fuga at expedita quis voluptatibus accusamus deleniti nemo! Tempora suscipit
    //         provident, nihil ex ullam at repudiandae maiores odit optio minus corrupti quibusdam numquam, iusto quod natus veniam aliquam minima eaque voluptates alias
    //         officia enim blanditiis nostrum inventore. Quisquam molestiae obcaecati eligendi unde neque vero aut voluptatum, reprehenderit non iste! Ratione, aspernatur.
    //         Voluptas excepturi quidem corporis cupiditate debitis a, recusandae assumenda officia consequatur quisquam sed necessitatibus numquam, libero omnis incidunt
    //         provident molestiae reiciendis possimus quae blanditiis? Aperiam tempora fugiat vero voluptate voluptates reprehenderit nostrum fugit, assumenda esse.
    //         Consequuntur consectetur possimus rerum et enim repellat dicta assumenda iste odit totam ipsum corporis aspernatur, maxime, nam nobis sint sed explicabo
    //         repudiandae mollitia quidem reprehenderit voluptas nemo sunt ad. Sit hic, eaque quam voluptate harum eligendi ea deleniti est porro adipisci similique minus
    //         vero reprehenderit quibusdam, iusto blanditiis molestias consectetur eos delectus eveniet magnam iste suscipit! Quos dolore nisi distinctio ducimus delectus,
    //         culpa maxime odio ea neque iure. Laboriosam tenetur aperiam pariatur numquam impedit dignissimos! Vero, ab dolor reiciendis deserunt perferendis tempora rem
    //         quia vel repudiandae qui maiores sapiente quidem veritatis? Eius nobis repellat officiis, consequatur accusamus temporibus accusantium! Error nobis ab eos
    //         aliquam labore in cum, unde magnam incidunt recusandae distinctio dolores nesciunt esse quibusdam accusamus aliquid aspernatur vel quo dolore. Pariatur
    //         architecto quas ut laborum, ad fuga eveniet at rerum repudiandae omnis, vel, magnam ea! Pariatur repellendus et doloribus itaque, culpa id repellat non
    //         recusandae, aut necessitatibus ex nemo omnis vitae quas eveniet fuga est cupiditate quis harum quisquam numquam, corrupti voluptatum architecto! Veritatis
    //         omnis quo ut, officia rerum cum suscipit obcaecati voluptatem sed nobis esse placeat hic molestiae tempore illum consequatur, similique dolores, dolorum quae
    //         nesciunt! Nihil aliquam blanditiis ullam tempore nostrum ad officiis, nam aliquid. Maiores quidem cupiditate saepe optio nesciunt consequuntur, doloremque
    //         eius. Saepe illo beatae odit iure rem aspernatur ut, explicabo doloribus dignissimos magnam, provident facilis exercitationem, facere laboriosam. Recusandae,
    //         eaque eveniet? Nihil, corporis. Ut corporis possimus quaerat saepe eveniet quia accusantium iste ipsum officiis. Aliquid amet perspiciatis quibusdam provident
    //         mollitia alias consequatur ratione, accusamus consectetur tempore molestias, atque laborum impedit necessitatibus temporibus quisquam quia nemo voluptatem
    //         quam? Officia at culpa esse sed! Doloremque dolorem commodi doloribus voluptates ratione praesentium tempora amet! Nam consectetur eaque corporis mollitia.
    //         Hic consectetur, voluptatem repudiandae culpa soluta ut, eveniet magni ab iure aliquid eaque et vero. Ad sapiente hic consectetur sunt, repellendus unde
    //         quibusdam corporis, odio iste deserunt aliquam libero aperiam impedit sequi eum labore magnam? Perspiciatis distinctio, molestias autem cumque velit impedit
    //         sit ipsum incidunt enim, placeat hic non totam. Sequi, voluptatum odio suscipit beatae hic, ullam non, at ad nostrum sunt quod possimus magnam eos optio
    //         consequatur quo facilis libero! Hic nemo amet eum ex ipsa odio laborum delectus excepturi harum modi cupiditate dolores quia recusandae quis rem at aspernatur
    //         fugiat facere, atque fuga perferendis tempore exercitationem minus quae? Eos nemo suscipit assumenda facere a?`;
    //     await createData("blogs", {
    //         title: `Blog mới nhat`,
    //         content: cont,
    //         authorUid: "1zDzNJcsxDNUTctwizKV2jlU2rN2",
    //     });
    // };

    return (
        <div className="min-[880px]:px-20 px-5">
            {/* <button onClick={writeBlog}>Tạo 20 blog mới</button> */}
            {/* <button onClick={writeBlog}>delete</button> */}
            <h1 className="text-2xl font-bold">{data?.blogData.title}</h1>
            <div className="flex my-3">
                <Image src={data?.authorData.photoURL} width={50} height={50} alt={data?.authorData.displayName} className="w-[50px] h-[50px] rounded-full" />
                <div className="ml-3">
                    <p className="text-lg font-medium ">{data?.authorData.displayName}</p>
                    <p className="text-sm text-gray-500 font-medium ">{data?.blogData.createdAt}</p>
                </div>
            </div>
            <p>{data?.blogData.content}</p>
            <p>Ngày tạo: {data?.blogData.createdAt}</p>
            {/* <p>Tags: {data?.blogData.tag[0]}</p> */}
        </div>
    );
};

export default BlogDetail;
