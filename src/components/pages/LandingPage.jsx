"use client";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Marquee } from "@/components/magicui/marquee";

const LandingPage = () => {
    return (
        <div className="w-full pt-32 px-7 ">
            <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                    )}
                >
                    JobNext - AI
                </span>
            </AnimatedGradientText>
            <div className=" text-center mt-8 ">
                <SparklesText sparklesCount={20} className="text-6xl font-medium font-sans mb-5" text="Định hướng nghề nghiệp với AI" />
                <SparklesText sparklesCount={20} className="text-6xl font-medium font-sans" text="Tìm việc phù hợp và phát triển kỹ năng!" />
            </div>
            <div className="mt-14">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nesciunt ipsam architecto enim magni ut mollitia repudiandae eaque in. Commodi alias,
                voluptatem natus culpa illo ullam maxime nam modi est velit aspernatur inventore nisi facere architecto nostrum fugiat tempore ducimus doloribus quisquam
                quam! Ipsam quam nihil reprehenderit doloribus aliquid maxime obcaecati amet, porro esse atque, fugiat, voluptates voluptatibus impedit voluptatum quos.
                Reprehenderit excepturi recusandae, quis architecto sint odio ratione quam natus vel fuga inventore, corporis omnis dicta! Voluptate autem corrupti,
                excepturi expedita nisi repellat dolorem aperiam rem sit, culpa quae placeat pariatur dicta! Ducimus dolorem dignissimos in maiores eos autem unde
                explicabo omnis, ex, adipisci sint numquam iure similique quia perspiciatis, praesentium quod possimus cum! Nemo, aliquid tenetur recusandae perspiciatis
                accusantium iste aliquam quas adipisci amet error illo molestias ratione harum dignissimos ea tempora aperiam assumenda nam modi architecto doloremque
                ducimus repellat sed nesciunt! Iusto, earum! Eos rerum ex adipisci enim, vel sapiente dolorum atque ipsum est exercitationem tenetur itaque, ab voluptatem
                deserunt esse ut ad id cumque quae laudantium veritatis eveniet, nobis mollitia suscipit! Tempore mollitia, id cum sed magni error incidunt numquam
                aliquam? Porro, adipisci. Ut, aut pariatur adipisci repellendus asperiores facere earum suscipit laborum dolorem. Voluptate, exercitationem repudiandae
                esse, porro blanditiis nulla delectus iure ipsam ducimus dolor eaque, soluta sit temporibus earum placeat optio. Odio est enim id impedit commodi at iste
                reprehenderit? Mollitia alias aliquam, molestias sunt neque non accusamus. Beatae explicabo nobis adipisci molestias sequi, placeat, recusandae et maiores
                facere, inventore accusantium earum! Et, sequi. Doloremque non culpa, ea earum debitis minus temporibus ut placeat atque cum illo, soluta assumenda id
                praesentium ex odit! Magni, laboriosam ea recusandae id aspernatur iste, eum autem, nihil perferendis placeat nulla aperiam vitae laborum a sapiente
                nostrum porro reprehenderit! Possimus ea saepe ad maxime provident illum. Officia laboriosam et esse labore quisquam at, mollitia impedit qui? Temporibus
                quos odio veritatis eligendi fugit quaerat laudantium qui recusandae dolor debitis laboriosam repellendus nulla excepturi sequi modi id, corrupti possimus
                iure voluptate voluptas explicabo animi. Harum fuga adipisci eaque placeat qui consequuntur provident! Beatae ut consectetur autem fugit tempora maxime
                repellendus odit consequuntur magni, expedita animi sit ipsam provident eaque, sapiente culpa quidem. Excepturi molestias iste nemo natus sit aliquam modi
                ullam explicabo obcaecati dolor cupiditate nobis id ipsum eligendi magni esse temporibus eveniet voluptates in maxime tempore deserunt, unde quam
                necessitatibus. Minus vero facilis porro, error est fugiat sunt obcaecati odit molestiae quaerat ab distinctio dignissimos repellendus ex aperiam
                temporibus velit suscipit alias impedit delectus aut nulla sequi et. Placeat incidunt aliquid perferendis eius veritatis doloribus quae modi magni
                suscipit assumenda tempora, possimus est, fuga quidem magnam. Harum blanditiis voluptate doloribus minus iste ex molestiae eum architecto, possimus vitae
                magni unde officia magnam? Dolore, recusandae, excepturi natus a ea inventore facilis velit in, nobis corrupti alias? Illum possimus earum et libero
                reiciendis, rem dicta sunt quis saepe nisi porro asperiores fuga commodi sequi officia vitae natus labore, cumque, laudantium similique at? Quisquam, illo
                itaque magnam repellat dolores ipsam maxime recusandae animi, accusamus quaerat reprehenderit voluptatibus aspernatur aliquid nostrum totam blanditiis
                commodi beatae tempore consequatur. Consequuntur dolorem alias qui laboriosam, obcaecati error necessitatibus? Laborum animi aperiam laboriosam accusamus
                eius magni neque, exercitationem eum est quam quasi, voluptatibus quae corrupti, inventore explicabo at eligendi iste. Ab alias impedit magni fuga
                reiciendis dolores cum rem asperiores excepturi a laboriosam earum, fugit perspiciatis officia labore nam accusantium amet tenetur voluptates repellat!
                Rem voluptates ipsum aspernatur molestias expedita cum ex odit nemo minus molestiae. Inventore quasi, ipsum amet quidem recusandae cumque similique iste
                obcaecati, in unde quia sequi vero cupiditate. Voluptas quis neque, hic impedit voluptatum tenetur vel temporibus minima ipsam laboriosam corporis optio
                iste quo quibusdam tempora et suscipit excepturi. Voluptas explicabo atque voluptatibus facere reprehenderit obcaecati, officia quibusdam perferendis
                commodi repudiandae, nulla ut minima nesciunt. Qui doloremque harum sequi incidunt, perferendis veniam minus labore odio fugiat sunt distinctio accusamus
                nulla facere beatae nostrum maxime aspernatur, quibusdam, ipsum sint? Quos natus tempore facilis officiis doloremque possimus vel, dolorem dolores
                officia, consequatur labore nobis itaque? Voluptate provident nisi rem optio beatae, illum unde nam iste similique quisquam deserunt placeat praesentium
                mollitia ad earum? Reprehenderit veniam harum delectus id! Quaerat, earum! Necessitatibus, voluptatum quasi minus hic cum ad fuga beatae voluptate, vero
                neque minima numquam veritatis, harum maxime cupiditate laudantium commodi corporis provident. Labore voluptatibus, officiis quam blanditiis ab voluptas
                est commodi dolorem! Ullam, rerum perspiciatis. Enim possimus repellat ex itaque officiis quia natus omnis saepe quo consectetur quidem, sed aperiam
                aliquam ut eos. Officiis consectetur aspernatur porro recusandae dolorem deleniti alias excepturi quibusdam voluptatibus laboriosam dignissimos error,
                sequi, nam animi ducimus fugit harum rerum suscipit libero. Porro alias modi saepe ullam quam, ipsa id exercitationem explicabo labore cumque repudiandae
                autem atque praesentium eligendi at nostrum! Aut, architecto odit. Sed ad omnis saepe quod architecto, a vitae, voluptas eius blanditiis ipsum
                necessitatibus nostrum! Aut dignissimos fugiat maiores distinctio sunt architecto, tempore voluptatum excepturi pariatur, praesentium veniam hic eos
                aliquam obcaecati. Alias similique nostrum, molestiae consequuntur hic odio dolore, vel facere ullam possimus accusantium voluptates perferendis unde
                inventore ipsum accusamus itaque cupiditate earum beatae! Tempora eum ipsam porro facilis accusantium perspiciatis? Accusantium, ipsa, obcaecati placeat,
                iure omnis facere animi saepe esse vel iste sint tempore dolorem reprehenderit fuga ullam a. Odit nemo rerum, laboriosam recusandae cupiditate eveniet
                iure libero ut provident blanditiis numquam tempore amet! Labore consectetur modi cupiditate optio enim blanditiis, praesentium molestias sequi nesciunt
                facere tempore nam nihil incidunt ipsum commodi? Velit corporis, nisi asperiores ut rerum corrupti optio numquam at accusantium harum minus, ratione
                doloribus enim, assumenda quia? Consequatur maiores, expedita molestiae reprehenderit maxime vitae eligendi modi voluptatem incidunt, iste pariatur.
                Molestiae iste officia nobis alias libero, aut ipsam iure reprehenderit similique quasi temporibus laborum itaque sapiente sed maxime eligendi, corrupti
                suscipit vel aspernatur aliquam ab praesentium obcaecati qui accusamus. Dolor, sed. Eum reiciendis earum fuga corporis eveniet veniam non totam dolore
                quisquam autem pariatur quia quo, eaque amet tenetur! Nemo tempora odio sunt praesentium? Quas magnam culpa voluptatem vero, pariatur tenetur voluptatum,
                facilis reprehenderit optio doloribus dolores eaque. Error numquam, veritatis eaque nemo aut esse accusantium eos vero! Necessitatibus incidunt
                dignissimos totam nostrum voluptatem laboriosam velit eos quia dolorem dicta debitis libero id iste officiis maiores at ducimus magni consectetur
                voluptatibus, temporibus quidem, excepturi nam rem. Modi libero voluptatibus sapiente non recusandae itaque in iste! Eius quis cumque repudiandae
                voluptatem, aspernatur fuga harum delectus dolores reprehenderit voluptates veritatis eaque temporibus illum aliquid pariatur atque quos odio sed optio
                nesciunt quasi, sint possimus quibusdam! Quo vero, rem officiis asperiores numquam debitis hic nulla dolores autem molestias incidunt sit. Sunt
                perferendis eos dolorem magnam! Officiis quisquam, voluptates facere explicabo cupiditate dolores temporibus omnis aliquam dolorem ipsum nisi sit impedit
                iusto similique eaque delectus adipisci eius asperiores? Eius commodi suscipit iusto impedit doloribus doloremque id vel enim possimus, aspernatur
                excepturi. Nobis incidunt amet architecto ipsa delectus provident voluptate aperiam tempore omnis illum iure ex accusamus nulla dicta autem ipsum,
                consectetur numquam, nesciunt aspernatur saepe. Labore laboriosam soluta vel, illum et necessitatibus nulla assumenda quibusdam rerum repellat consectetur
                accusamus amet ducimus nostrum inventore sequi dolores, est cupiditate quo expedita pariatur sed. Dolorum praesentium repudiandae blanditiis omnis
                aspernatur nam consequatur sequi recusandae illum qui corrupti, eaque maiores similique repellendus nemo commodi ea numquam sit ratione quis amet.
                Eligendi esse et veritatis totam vero tempora nisi sapiente officia impedit soluta, quisquam minus, placeat eveniet, ex aliquam? Odio quia fuga cumque,
                ducimus cupiditate modi qui dolore illum non esse? Dolorem distinctio odio qui et voluptates officiis quam necessitatibus, iusto corporis, possimus
                accusamus. Quasi temporibus suscipit culpa? Facere reprehenderit distinctio at explicabo. Facere distinctio eius inventore dolores architecto accusantium
                enim. Distinctio ea at voluptate mollitia recusandae perspiciatis ipsa rem necessitatibus nulla obcaecati quas aspernatur laborum tempora laboriosam
                harum, pariatur, magni doloremque excepturi culpa officia maxime eum, veritatis similique. Soluta ad quidem aliquid a distinctio ea sed deleniti vero
                corrupti labore. Accusantium iure laudantium repellendus repudiandae, blanditiis, libero, impedit dolore ducimus ex omnis odit atque vitae facere sed
                tempore. Consequuntur quo adipisci, nulla cupiditate, eius ipsa nisi libero blanditiis a qui similique exercitationem deleniti ullam sapiente ducimus,
                laudantium facere. Cum, magni at amet aliquid quibusdam ipsam fugiat quam enim illum? Facilis officia illum rerum beatae. Assumenda dolores repellat
                ratione reprehenderit. Voluptatum recusandae sit quaerat tenetur eaque minus obcaecati corporis neque earum ut? Dolor voluptatibus vitae quisquam ut autem
                delectus. Ad libero, tempore quaerat autem harum nisi voluptates quasi illo esse eius architecto voluptate modi assumenda. Alias doloremque autem
                aspernatur dignissimos harum molestiae debitis nemo dolorem illum cum, nesciunt saepe odio iste quae, quod corrupti earum commodi id maiores quaerat
                aperiam quo? Sit odio labore quis nobis magnam assumenda beatae voluptatibus. Itaque qui cum laudantium quo facilis impedit voluptate, perferendis dolores
                incidunt labore odit commodi corrupti consectetur nesciunt, praesentium sapiente, corporis rerum sunt voluptatum soluta repudiandae distinctio obcaecati
                nulla. Deserunt magnam expedita libero incidunt numquam ratione eligendi excepturi necessitatibus, officiis natus perferendis voluptatibus nam eum! Ab,
                vero est optio saepe beatae modi! Deserunt, enim facilis? Atque sapiente provident asperiores eveniet necessitatibus eos adipisci unde id illo, expedita
                earum quis assumenda officiis quod sequi quam laboriosam deleniti accusantium delectus doloremque aut excepturi? Hic iusto debitis, eligendi fugit quae
                veniam necessitatibus architecto labore quas non vitae ducimus illo odit consectetur asperiores temporibus sed repellat obcaecati exercitationem, ex
                doloribus sit et consequatur cupiditate. Ex id, ab esse quos rerum, iusto repellat fugit in magni reiciendis ipsum sint eligendi modi quaerat non
                explicabo nesciunt sequi, tenetur blanditiis vero accusamus. Ipsam mollitia dolor soluta blanditiis aliquam ad laudantium voluptates id ullam itaque
                tempora facilis totam veritatis impedit voluptatem, architecto ea quas repellendus reiciendis ab cum voluptatum temporibus. Ab ullam ex corrupti assumenda
                earum quisquam deserunt ipsa? Dolores sint repudiandae nulla nesciunt neque perspiciatis reiciendis quod vero, voluptatem mollitia dolorum laudantium aut.
                Suscipit, esse adipisci praesentium iure delectus illo rerum ipsa aliquid accusamus distinctio veniam? Itaque, tempora voluptatem incidunt iste
                architecto, autem deleniti, alias animi eligendi voluptas fuga id quae quod nisi impedit? Illo tempore quos inventore sunt tenetur. Nemo voluptas quidem
                recusandae, eaque porro corrupti nesciunt a quaerat officiis tempora magni quae inventore veritatis quis ullam similique molestiae velit. Iste distinctio
                eveniet ipsam dolore perspiciatis mollitia natus modi aperiam ea totam nihil fuga iure labore soluta quam eligendi consequuntur praesentium veritatis quis
                provident eius hic, voluptatibus ut. Ipsa tempore nesciunt dicta? Autem nemo ipsam deserunt magnam quae consequatur qui provident libero, pariatur
                distinctio odit nesciunt repellat animi, atque repellendus? Sint libero cum rem ipsum quidem commodi culpa quasi tempore voluptatem repellat, ex quibusdam
                similique? Minima libero quae impedit eveniet aliquam commodi obcaecati non quaerat quos possimus sunt, facilis voluptatem explicabo et reprehenderit hic
                iure, minus voluptatum placeat similique! Illum veritatis vero qui odit voluptates nam incidunt cumque, unde voluptatibus tenetur nobis, voluptatum dolor
                officia, inventore saepe corporis nesciunt nulla minima delectus perspiciatis facilis amet? Ullam provident temporibus sunt cupiditate iure, nihil
                obcaecati accusamus nostrum consequuntur cum maxime aperiam nobis autem est. Facere, veniam. Quas qui vero tenetur? Optio quasi iusto vel? Maiores
                perspiciatis unde consectetur odio, dolor, blanditiis, ut voluptas at a ducimus doloremque quisquam quas. Ipsa placeat officia dicta ipsum, nisi dolores
                quo distinctio aliquam id rem voluptatum quasi! Nostrum possimus autem modi ex, minima hic delectus consectetur accusantium, impedit dignissimos dolorum
                vitae officiis veritatis. Veniam, nihil tenetur eos esse sed quia aperiam? Placeat tempore, dolor aliquam excepturi soluta et qui dicta fuga voluptates
                reprehenderit nostrum iure maiores corrupti minus veniam esse numquam assumenda incidunt! Deleniti magnam at amet dolore libero, hic assumenda.
                Voluptatibus sint itaque quisquam, officia magni, quas fugiat illo consequatur pariatur cumque aperiam temporibus labore fugit laborum ab autem eveniet
                aut officiis. Asperiores magnam odit corporis omnis praesentium suscipit officiis, ullam veniam earum obcaecati harum commodi pariatur minima quia! Hic
                accusantium asperiores, nostrum a delectus error quibusdam nam illo cum aliquam deleniti. Consequatur alias quia eos pariatur. Commodi molestias labore
                officiis! Sint porro exercitationem praesentium. Cupiditate voluptatum quam sapiente officia quasi, odit neque vero laboriosam perspiciatis alias
                reiciendis aliquam, similique non exercitationem cumque fuga? Voluptatem ex deserunt quasi saepe? Dolorem saepe animi mollitia labore magnam.
            </div>
        </div>
    );
};

export default LandingPage;

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

var firstRow = reviews.slice(0, reviews.length / 2);
var secondRow = reviews.slice(reviews.length / 2);

var ReviewCard = ({ img, name, username, body }) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};
