package main

import (
	"fmt"
	"image"
	"image/jpeg"
	"math"
	"os"

	"golang.org/x/image/draw"
)

func imageConveter() {
	path := "/sample.jpg"
	data, err := os.Open(path)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}
	defer data.Close()
	imgData, _, err := image.Decode(data)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}

	imgRectangle := imgData.Bounds()
	width := imgRectangle.Dx()
	height := imgRectangle.Dy()

	// widthかheightの長い方を750に固定してリサイズします。
	limitEdge := 750

	// 以下の条件分岐で、リサイズしたいサイズで空のインスタンスを作成する。
	newImgData := &image.RGBA{}
	// heightがwidth以上の場合
	if height >= width {
		f := float64((width * limitEdge))
		w := math.Round(f / float64(height))
		newImgData = image.NewRGBA(image.Rect(0, 0, int(w), limitEdge))
	} else {
		f := float64((limitEdge * height))
		h := math.Round(f / float64(width))
		newImgData = image.NewRGBA(image.Rect(0, 0, int(h), limitEdge))
	}

	// drawパッケージを使って、画像データを反映させる。
	// CatmullRomを使っているが、drawパッケージに他にも反映させる関数が用意されている。
	draw.CatmullRom.Scale(newImgData, newImgData.Bounds(), imgData, imgRectangle, draw.Over, nil)
	newImg, err := os.Create("./new_image.jpg")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}
	defer newImg.Close()

	// jpegの場合のエンコード、各フォーマットごとにエンコードの方法は異なります。
	if err := jpeg.Encode(newImg, newImgData, &jpeg.Options{Quality: 100}); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}
}
