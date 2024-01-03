import Template from "@/components/common/template";
import Iframe from "react-iframe";

export default function Kapcsolat() {
  return (
    <Template>
      <div className="mt-24 w-full px-4">
        <h1 className="font-bold text-3xl">Kapcsolat</h1>
        <p>
          Várjuk egy megbeszélésre Budapest belvárosában található irodánkban.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4  mt-4 h-[70vh] border border-gray-200 rounded-xl overflow-hidden">
          <div className="col-span-1 flex flex-col items-center justify-center text-center gap-2">
            <p>
              1054 Budapest, Szabadság tér 7.,
              <br />
              Bank Center, Citi torony, I. emelet
            </p>
            <p>+36 30 99 89 114</p>
            <p>info@walkerweights.hu</p>
          </div>
          <Iframe
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=House%20of%20Business%20Bank%20Center+(Walker%20&amp;%20Weights)&amp;t=h&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
            height="100%"
            frameborder="0"
            style="border:0"
            className="col-span-3"
            allowfullscreen
          ></Iframe>
        </div>
      </div>
    </Template>
  );
}
